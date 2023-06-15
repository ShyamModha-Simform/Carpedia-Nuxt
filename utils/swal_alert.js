import Swal from "sweetalert2";

function swal_alert(type, car) {
    Swal.fire({
        title: `${type === "edit" ? "Updated" : "Created"} data`,
        html: `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
            <img src="${car.image}" alt="Logo" style="width: 300px;" />
            <h3>${car.name}</h3>
                <p>Price: ${car.price}</p>
            <p>Details: ${car.details}</p>
      </div>
      </div> `,
        showCloseButton: true,
        showConfirmButton: true,
        showCancelButton: false,
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}

export default swal_alert;
