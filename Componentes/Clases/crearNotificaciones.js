import * as Notifications from 'expo-notifications';

class NotificacionesService {
  //-----------------------------------------------
  static async programarNotificacion(tarea) {
    try {
      const { Titulo, Fecha, Hora } = tarea;

      // Crear nueva fecha objetivo
      let fechaObjetivo = new Date(Fecha);

      // Establecer la hora usando el nuevo formato
      if (Hora && Hora.Tiempo) {
        fechaObjetivo.setHours(Hora.Tiempo.hours);
        fechaObjetivo.setMinutes(Hora.Tiempo.minutes);
        fechaObjetivo.setSeconds(0);
        fechaObjetivo.setMilliseconds(0);
      }

      // Verificar si la fecha es futura
      const ahora = new Date();
      if (fechaObjetivo <= ahora) {
        return {
          success: false,
          message: 'La fecha y hora seleccionada ya pasó',
        };
      }

      console.log('Fecha y hora programada:', fechaObjetivo.toLocaleString());

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: '¡Recordatorio de Tarea!',
          body: `${Titulo}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          date: fechaObjetivo,
        },
      });

      return {
        success: true,
        notificationId: id,
        scheduledFor: fechaObjetivo,
      };
    } catch (error) {
      console.error('Error al programar notificación:', error);
      return {
        success: false,
        message: error.message || 'Error al programar la notificación',
      };
    }
  }

  //-----------------------------------------------
  static async cancelarTodasLasNotificaciones() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      return true;
    } catch (error) {
      console.error('Error al cancelar todas las notificaciones:', error);
      return false;
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
