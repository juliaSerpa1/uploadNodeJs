const Picture = require("../models/Pictures");

exports.create = async(req,res) =>{
    try{

        const {name} = req.body

        const file = req.file

        const picture = new Picture({
            name,
            src:file.path
        });

        await picture.save();
        
        res.json({picture, msg:"Imagem salva com sucesso!"});

    }catch(error) {
        res.status(500).json({message:"Erro ao salvar imagem."})
    }
};


exports.remove = async(req, res) =>{
    try{
        const picture = await Picture.findById(req.params.id);

        if(!picture){
            return res.status(404).json({msg:"Imagem não encontrada."});
        }

        fs.unlinkSync(picture.src);

        await picture.remove();

        res.json({msg:"Imagem excluida com sucesso."})
    }catch(error){
        res.status(500).json({message:"Erro ao exluir imagem."})
    }
}