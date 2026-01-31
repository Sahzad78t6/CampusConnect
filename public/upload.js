function uploadImage() {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "admin_images");

  fetch("https://api.cloudinary.com/v1_1/drhjjylo0/image/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (!data.secure_url) {
        alert("Upload failed");
        return;
      }

      const gallery = document.getElementById("gallery");

      const img = document.createElement("img");
      img.src = data.secure_url;
      img.style.width = "200px";

      const br = document.createElement("br");

      const link = document.createElement("a");
      link.href = data.secure_url;
      link.innerText = "Download Image";
      link.download = "";

      gallery.appendChild(img);
      gallery.appendChild(br);
      gallery.appendChild(link);
      gallery.appendChild(document.createElement("hr"));
    })
    .catch(err => {
      console.error(err);
      alert("Error uploading image");
    });
}
