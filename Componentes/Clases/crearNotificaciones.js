import * as Notifications from 'expo-notifications';

class NotificacionesService {
  //-----------------------------------------------
  static async programarNotificacion(tarea) {
    const fechaValida = new Date(tarea.Fecha);
    const horaValida = new Date(tarea.Hora);

    horaValida.setFullYear(fechaValida.getFullYear());
    horaValida.setMonth(fechaValida.getMonth());
    horaValida.setDate(fechaValida.getDate());

    const trigger = horaValida;

    if (isNaN(trigger.getTime())) {
      throw new Error('Fecha y hora combinadas no válidas');
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alert! Llego la hora de tu tarea!',
          body: tarea.Titulo,
        },
        trigger,
      });
    } catch (e) {
      alert('error al crear la notificacion');
    }
  }

  //-----------------------------------------------
  static async cancelarNotificaciones(notificationIds) {
    try {
      for (const { id } of notificationIds) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
      return true;
    } catch (error) {
      console.error('Error al cancelar notificaciones:', error);
      return false;
    }
  }
}

export default NotificacionesService;
//------------------------------------------------------
// const crearNotificacion = async (tarea) => {
//   const fechaValida = new Date(tarea.Fecha);
//   const horaValida = new Date(tarea.Hora);

//   horaValida.setFullYear(fechaValida.getFullYear());
//   horaValida.setMonth(fechaValida.getMonth());
//   horaValida.setDate(fechaValida.getDate());

//   const trigger = horaValida;

//   if (isNaN(trigger.getTime())) {
//     throw new Error('Fecha y hora combinadas no válidas');
//   }
//   try {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: 'Alert! Llego la hora de tu tarea!',
//         body: tarea.Titulo,
//       },
//       trigger,
//     });
//   } catch (e) {
//     alert('error al crear la notificacion');
//   }
// };
