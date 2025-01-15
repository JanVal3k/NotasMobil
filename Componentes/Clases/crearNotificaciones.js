import * as Notifications from 'expo-notifications';

class NotificacionesService {
  //-----------------------------------------------
  static async programarNotificacion(tarea) {
    try {
      const { Titulo, Fecha, Hora } = tarea;

      let fechaObjetivo = new Date(Fecha);

      if (Hora && Hora.Tiempo) {
        fechaObjetivo.setHours(Hora.Tiempo.hours);
        fechaObjetivo.setMinutes(Hora.Tiempo.minutes);
        fechaObjetivo.setSeconds(0);
        fechaObjetivo.setMilliseconds(0);
      }

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
          body: `titulo: ${Titulo} y fecha: ${fechaObjetivo}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATETIME,
          timestamp: fechaObjetivo.getTime(),
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
  static async testNotificacionSimple() {
    try {
      const ahora = new Date();
      console.log('Hora actual:', ahora.toLocaleString());

      // Calculamos el timestamp para 2 minutos después
      const enDosMinutos = new Date(ahora.getTime() + 2 * 60 * 1000);
      console.log('Hora programada:', enDosMinutos.toLocaleString());

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Prueba Simple',
          body: 'Esta es una notificación de prueba simple',
          priority: 'high',
          channelId: 'default',
        },
        trigger: {
          channelId: 'default',
          date: enDosMinutos, // Usando date en lugar de seconds
        },
      });

      console.log('Notificación programada con ID:', id);

      // Agregamos un pequeño delay antes de verificar las notificaciones programadas
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const notificacionesProgramadas =
        await Notifications.getAllScheduledNotificationsAsync();
      console.log(
        'Notificaciones programadas:',
        JSON.stringify(notificacionesProgramadas, null, 2)
      );

      return {
        success: true,
        notificationId: id,
        scheduledFor: enDosMinutos,
      };
    } catch (error) {
      console.error('Error en la prueba:', error);
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
