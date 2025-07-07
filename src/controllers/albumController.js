import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req, res) => {
  try {
    const { name, desc, color } = req.body;
    const imagefile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imagefile.path, {resource_type: "image"});

    const albumData = {
      name,
      desc,
      bgColor: color,
      image: imageUpload.secure_url
    };

    const album = albumModel(albumData);
    await album.save();

    res.json({ success: true, message: "Album added" });

  } catch (error) {
    console.error("Error adding album:", error);
    res.json({ success: false, message: "Server error" });
  }
};

const listAlbum = async (req, res)=>{

    try {
        const allAlbums = await albumModel.find({})
        res.json({success:true, albums:allAlbums})

    } catch (error) {
        res.json({suceess:false})
    }

}

const removeAlbum = async (req, res)=>{

    try {
        await albumModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"removed"})
    } catch (error) {
        res.json({success:false})
    }

}

export {addAlbum, listAlbum, removeAlbum}