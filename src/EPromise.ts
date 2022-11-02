// @ts-ignore
class EPromise<T> extends Promise<T> {
    static async all<T>(inputMap: Record<string, Promise<T>>): Promise<Record<string, T>>
    static async all<T>(inputMap: Promise<T>[]): Promise<T[]>
    static async all<T>(inputMap: Record<string, Promise<T>> | Promise<T>[]): Promise<Record<string, T> | T[]> {
        if(Array.isArray(inputMap))
            return super.all<T>(inputMap)
        else
        return new Promise<Record<string, T>>((resolve, reject) => {
            const inEntries: ([string, Promise<T> | T])[] = Object.entries(inputMap)
            const inPromiseArr = inEntries.map(entry => entry[1])
            super.all<T>(inPromiseArr)
                .then((valueArr:T[]) => {
                    inEntries.forEach((_, index, entry) => {
                        entry[index][1] = valueArr[index]
                    })
                    const resObj = Object.fromEntries(inEntries)
                    resolve(<Record<string, T>>resObj)
                })
                .catch((reason:string)=>{
                    reject(reason)
                })
        })
    }
    static async allSettled<T>(inputMap: Record<string, PromiseLike<T>>): Promise<Record<string,PromiseSettledResult<T>> | PromiseRejectedResult>
    static async allSettled<T>(inputMap: Iterable<PromiseLike<T>>): Promise<PromiseSettledResult<T>[] | PromiseRejectedResult>
    static async allSettled<T>(inputMap: Record<string, PromiseLike<T>> | Iterable<PromiseLike<T>>) :
        Promise<Record<string,PromiseSettledResult<T>> | PromiseSettledResult<T>[] | PromiseRejectedResult>{
        if(Array.isArray(inputMap))
            return super.allSettled<T>(inputMap)
        else
            return new Promise((resolve, reject) => {
                const inEntries: ([string, PromiseLike<T> | PromiseSettledResult<T>])[] = Object.entries(inputMap)
                const inPromiseArr = inEntries.map(entry => entry[1])
                super.allSettled<T>(inPromiseArr as Promise<T>[])
                    .then((valueArr:PromiseSettledResult<T>[]) => {
                        inEntries.forEach((_, index, entry) => {
                            entry[index][1] = valueArr[index]
                        })
                        const resObj = Object.fromEntries(inEntries)
                        resolve(<Record<string, PromiseSettledResult<T>>>resObj)
                    })
                    .catch((reason:string)=>{
                        reject(reason)
                    })
            })
    }
}

export {EPromise};

