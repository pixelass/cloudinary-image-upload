import { useState } from "react";
import Image from "next/image";

export default function CloudinaryUpload() {
  const [image, setImage] = useState(null); // The file object
  const [imageValue, setImageValue] = useState(""); // The file source
  const [images, setImages] = useState([]);
  // {
  // id: 123,
  // src: "example.com/myimage.jpg"
  // width: 100,
  // height: 100
  // }
  //
  return (
    <div>
      <h1>Cloudinary upload</h1>
      <h2>{imageValue}</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          formData.append("file", image);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
          );
          // const formValues = Object.fromEntries(formData);
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const json = await response.json();
          setImages([
            ...images,
            {
              id: json.asset_id,
              src: json.secure_url,
              height: json.height,
              width: json.width,
            },
          ]);
          console.log(json);
        }}
      >
        <label htmlFor="file">Please choose an image</label>
        <br />
        <input
          multiple={false}
          accept="image/jpg,image/png"
          id="file"
          type="file"
          value={imageValue}
          onChange={(event) => {
            console.log(event);
            setImageValue(event.target.value);
            setImage(event.target.files[0]);
          }}
        />
        <br />
        <br />
        <button type="submit">Upload Image</button>
      </form>

      <ul>
        {images.map((image) => {
          return (
            <li
              key={image.id}
              style={{ position: "relative", height: 100, width: 100 }}
            >
              <Image
                src={image.src}
                height={image.height}
                width={image.width}
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
