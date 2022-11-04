import {EPromise} from "../src";
describe("EPromise",()=>{
    describe("static-all",()=>{
        test("array-resolved",()=>{
            return EPromise.all<string | number>([
                new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve('haha1')
                    },3000)
                }),
                new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve('haha2')
                    },1000)
                }),
                Promise.resolve(3),
            ])
                .then(res=>{
                    expect(res).toEqual(['haha1','haha2',3])
                })
        })
        test("array-rejected",()=>{
            return EPromise.all<string | number>([
                new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        reject('haha1')
                    },3000)
                }),
                new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        reject('haha2')
                    },1000)
                }),
                Promise.resolve(3),
            ])
                .catch(res=>{
                    expect(res).toBe('haha2')
                })
        })
    test("object-resolved",()=>{
        return  EPromise.all({
            one:new Promise(resolve=>{
                setTimeout(_=>{
                    resolve('haha1')
                },3000)
            }),
            two:new Promise(resolve=>{
                setTimeout(_=>{
                    resolve('haha2')
                },1000)
            }),
            three:Promise.resolve(3),
        })
            .then(res=>{
                expect(res).toEqual({
                    one:'haha1',
                    two:'haha2',
                    three:3
                })
            })
    })
    test('object-rejected',()=>{
        expect(EPromise.all({
            one:new Promise(resolve=>{
                setTimeout(_=>{
                    resolve('haha1')
                },3000)
            }),
            two:new Promise((resolve,reject)=>{
                setTimeout(_=>{
                    reject('two rejected')
                },1000)
            }),
            three:Promise.resolve(3),
        })).rejects.toBe('two rejected')
    })
    })

    describe("static-allSettled",()=>{
        it("array-resolved",()=>{
            expect(EPromise.allSettled([
                new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve({name:'one',age:22})
                    },3000)
                }),
                new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        resolve('two resolved')
                    },1000)
                }),
                Promise.resolve(3)
            ])).resolves.toEqual([
                { status: 'fulfilled', value: {name:'one',age:22} },
                { status: 'fulfilled', value: 'two resolved' },
                { status: 'fulfilled', value: 3 }
            ])
        })
        it("array-rejected",()=>{
            expect(EPromise.allSettled([
                new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve({name:'one',age:22})
                    },3000)
                }),
                new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        reject('two rejected')
                    },1000)
                }),
                Promise.resolve(3)
            ])).resolves.toEqual([
                { status: 'fulfilled', value: {name:'one',age:22} },
                { status: 'rejected', reason: 'two rejected' },
                { status: 'fulfilled', value:3 }
            ])
        })
        it("object-resolved",()=>{
            expect(EPromise.allSettled({
                one:new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve({name:'one',age:22})
                    },3000)
                }),
                two:new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        resolve('two resolved')
                    },1000)
                }),
                three:Promise.resolve(3),
            })).resolves.toEqual({
                one:{ status: 'fulfilled', value: {name:'one',age:22} },
                two:{ status: 'fulfilled', value: 'two resolved' },
                three:{ status: 'fulfilled', value: 3 }
            })
        })

        it("object-rejected",()=>{
            expect(EPromise.allSettled({
                one:new Promise(resolve=>{
                    setTimeout(_=>{
                        resolve({name:'one',age:22})
                    },3000)
                }),
                two:new Promise((resolve,reject)=>{
                    setTimeout(_=>{
                        reject('two rejected')
                    },1000)
                }),
                three:Promise.resolve(3),
            })).resolves.toEqual({
                one:{ status: 'fulfilled', value: {name:'one',age:22} },
                two:{ status: 'rejected', reason: 'two rejected' },
                three:{ status: 'fulfilled', value:3 }
            })
        })
    })
})
