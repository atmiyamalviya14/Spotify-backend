import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
import upload from "../middlewares/multer.js";
import mongoose from "mongoose";

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;
    const audioFile = req?.files?.audio?.[0];
    const imageFile = req?.files?.image?.[0];

    if (!audioFile || !imageFile) {
      return res.status(400).json({ error: "Missing files" });
    }

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();

    res.json({success:true, message:"Song added"})

  } catch (error) {
    res.json({ success: false });
  }
};

const listSong = async (req, res) => {
  try {
    
    const allsongs = await songModel.find({})
    res.json({success: true, songs: allsongs})

  } catch (error) {
    
    res.json({success: false})

  }
};

const removeSong = async (req, res) => {

  try {

    await songModel.findByIdAndDelete(req.body.id)

    res.json({ success: true, message: "Song removed" });

  } catch (error) {
    res.json({ success: false, message: "Server error" });
  }
};


export { addSong, listSong, removeSong };
