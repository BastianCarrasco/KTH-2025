import emailjs from "emailjs-com";

export function enviarCorreo(templateParams) {
  // Reemplaza estos valores con tus IDs de EmailJS
  const serviceID = "service_r7nq4y9";
  const templateID = "template_famw6th";
  const userID = "UHvHe_3v38SCWLwQo";

  return emailjs
    .send(serviceID, templateID, templateParams, userID)
    .then((response) => {
      console.log("Correo enviado con éxito!", response.status, response.text);
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
    });
}
