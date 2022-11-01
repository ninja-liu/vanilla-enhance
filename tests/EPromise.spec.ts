import {EPromise} from "../src";
test("EPromise",()=>{
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
