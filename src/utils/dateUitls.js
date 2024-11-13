exports.calcWorkHours = (attendance) => {
    return (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
};