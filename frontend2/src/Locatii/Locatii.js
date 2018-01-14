import axios from 'axios'

const SERVER='http://localhost8080'

class Locatii{
    constructor(ee){
        this.emitter=ee
        this.content=[]
    }
    
    getAll(){
        axios(SERVER+ '/cupoane')
        .then((response)=> {
            this.content=response.data
            this.emitter.emit('Cupon incarcat')
        })


    
    }
    addOne(cupon){
        axios({
            method:'post',
            url:SERVER+'/cupoane/new',
            headers:{'Content-Type':'application/json'},
            data: cupon
        })
        .then(()=>this.getAll())
    }
    saveOne(id, cupon){}
    deleteOne(id){}
    
}

export default Locatii
