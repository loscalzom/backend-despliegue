export const middlewareDePrueba = (req, res, next) => {
    const numeroRandom = Math.random()
    if (numeroRandom > 0.5) {

        req.headers.suerte="El usuario tiene suerte"
       return next()
         
    }
    else {
        return res.json({ ok: false, status: 400, message: 'Mala suerte' })
    
    }}