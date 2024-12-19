import { ScheduleCell } from '@/types/scheduler';

// services/scheduleService.ts
export type Schedule = Record<string, Record<string, ScheduleCell>>;

class ScheduleService {
  private schedules: Schedule[] = [];

  saveSchedule(schedule: Schedule) {
    this.schedules.push(schedule);
    // Opcional: Guardar en localStorage
    localStorage.setItem('schedules', JSON.stringify(this.schedules));
  }

  loadSchedules(): Schedule[] {
    const storedSchedules = localStorage.getItem('schedules');
    if (storedSchedules) {
      this.schedules = JSON.parse(storedSchedules);
    }
    return this.schedules;
  }

  clearSchedules() {
    this.schedules = [];
    localStorage.removeItem('schedules');
  }
}

export const scheduleService = new ScheduleService();
