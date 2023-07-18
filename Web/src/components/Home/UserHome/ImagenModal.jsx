import React from "react";
import "./ImagenModal.css";
import { useState } from "react";

const ImagenModal = ({ setImagenModal, handleImageSubmit }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleImageSubmit(imageUrl);
    setImagenModal(false);
  };

  const closeModal = () => {
    setImagenModal(false);
  };

  return (
    <div className="modal-contenedor">
      <div className="animate__animated animate__fadeInRightBig modal-imagen">
        <i className="fa fa-times icon icon-cerrar" onClick={closeModal}></i>
        <h1>
          Ingrese una imagen en formato <span>URL</span> :
        </h1>
        <form className="comentar" onSubmit={handleSubmit}>
          <input
            type="url"
            value={imageUrl}
            onChange={handleChange}
            placeholder="Aca inserte el URL..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ImagenModal;
