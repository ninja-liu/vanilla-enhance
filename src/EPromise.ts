// @ts-ignore
class EPromise<T> extends Promise<T> {
    static async all<T>(inMap: Record<string, Promise<T>>): Promise<Record<string, T>> {
        return new Promise<Record<string, T>>((resolve, reject) => {
            const inEntries: ([string, Promise<T> | T])[] = Object.entries(inMap)
            const inPromiseArr = inEntries.map(entry => entry[1])
            super.all<T>(inPromiseArr)
                .then((valueArr:T[]) => {
                    inEntries.forEach((_, index, entry) => {
                        entry[index][1] = valueArr[index]
                    })
                    const resObj = Object.fromEntries(inEntries)
                    resolve(<Record<string, T>>resObj)
                })
        })
    }
}

export {EPromise};
