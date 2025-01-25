import mongoose from "mongoose";   
mongoose.connect("mongodb://localhost:27017/TM_PWA_LUN_MIE_DIC")
.then   ( () => {console.log("Conectado a la base de datos")})
.catch  ( (error) => {console.error("Error al conectar a la base de datos",error)})

export default mongoose