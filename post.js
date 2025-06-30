

// Image upload and preview
function handleBasicUpload(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("basicPreview");
    preview.innerHTML = "";
    currentImageDataUrl = null;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%";
            img.style.borderRadius = "8px";

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginTop = "10px";
            deleteBtn.style.background = "black";
            deleteBtn.style.color = "white";
            deleteBtn.style.border = "none";
            deleteBtn.style.borderRadius = "20px";
            deleteBtn.style.padding = "6px 16px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.onclick = function () {
                preview.innerHTML = "";
                // Also clear the file input value
                document.getElementById("basicFile").value = "";
                currentImageDataUrl = null;
            };

            preview.appendChild(img);
            preview.appendChild(deleteBtn);
        };
        reader.readAsDataURL(file);
    } else {
        preview.textContent = "No image selected";
    }
}
// Take Photo functionality
document
    .getElementById("takePhoto_btn")
    .addEventListener("click", async function () {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Camera access is not supported in this browser.");
            return;
        }
        //video element for preview
        const video = document.createElement("video");
        video.autoplay = true;
        video.style.width = "100%";
        video.style.borderRadius = "8px";
        const preview = document.getElementById("basicPreview");
        preview.innerHTML = "";
        preview.appendChild(video);

        // capture button
        const captureBtn = document.createElement("button");
        captureBtn.textContent = "Capture";
        captureBtn.style.marginTop = "10px";
        captureBtn.style.background = "black";
        captureBtn.style.color = "white";
        captureBtn.style.border = "none";
        captureBtn.style.borderRadius = "20px";
        captureBtn.style.padding = "6px 16px";
        captureBtn.style.cursor = "pointer";

        preview.appendChild(captureBtn);

        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (err) {
            preview.innerHTML = "";
            alert("Could not access the camera.");
            return;
        }

        captureBtn.onclick = function () {
            // Create canvas to capture frame
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Stop video stream
            stream.getTracks().forEach((track) => track.stop());

            // Show captured image
            const img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            img.style.maxWidth = "100%";
            img.style.borderRadius = "8px";
            currentImageDataUrl = img.src;

            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginTop = "10px";
            deleteBtn.style.background = "black";
            deleteBtn.style.color = "white";
            deleteBtn.style.border = "none";
            deleteBtn.style.borderRadius = "20px";
            deleteBtn.style.padding = "6px 16px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.onclick = function () {
                preview.innerHTML = "";
                captureImageDataUrl = null;
            };

            preview.innerHTML = "";
            preview.appendChild(img);
            preview.appendChild(deleteBtn);
        };
    });
