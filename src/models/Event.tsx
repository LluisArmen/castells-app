export interface Event {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
    startDate?: string;
    endDate?: Date;
    attendance?: Attendance;
}

export interface Attendance {
    positive?: AttendanceResponse;
    negative?: AttendanceResponse;
    optional?: AttendanceResponse;
}

export interface AttendanceResponse {
    title?: string;
    count?: number;
    list?: [string];
}

export enum AttendanceType {
    positive = 'positive',
    negative = 'negative',
    optional = 'optional',
}