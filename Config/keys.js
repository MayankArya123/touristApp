if(process.env.NODE_ENV === 'production'){
    console.log('pro')
    module.exports=require('./prod')
}
else{
    console.log('dev')
    module.exports=require('./dev')
}