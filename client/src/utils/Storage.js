export class Storage{
    static getData(key){
        const getData = localStorage.getItem(key)
        return getData
    }

    static setData(key,value){
        localStorage.setItem(key, JSON.stringify(value))
    }

    static removeData(key){
        localStorage.removeItem(key)
    }
}