//dto stand for data transfer object, it is used to send specific data object after hiding some data

class useDTO{
    constructor(user){
        this._id=user._id;
        this.username=user.username;
        this.email=user.email;
    }
}

module.exports=useDTO;