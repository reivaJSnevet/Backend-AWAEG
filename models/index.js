import Role from "./Role.js";
import User from "./User.js";
import Functionary from "./Functionary.js";
import Subject from "./Subject.js";
import Application from "./Application.js";
import File from "./File.js";
import PreRegistration from "./PreRegistration.js";
import Appointment from "./Appointment.js";
import Student from "./Student.js";
import Caregiver from "./Caregiver.js";
import Group from "./Group.js";
import Class from "./Class.js";
import Grade from "./Grade.js";
import Timetable from "./Timetable.js";
import Loan from "./Loan.js";
import LoanSupplies from "./LoanSupplies.js";
import Supplies from "./Supplies.js";
import Flaw from "./Flaw.js";


// Role and User
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// User-related associations
User.hasOne(Functionary, { foreignKey: { name: "userName", allowNull: true }});
Functionary.belongsTo(User, { foreignKey: "userName"});

User.hasOne(Student, { foreignKey: { name: "userName", allowNull: true}});
Student.belongsTo(User, { foreignKey: "userName"});

User.hasMany(Loan, { foreignKey: "userName" });
Loan.belongsTo(User, { foreignKey: "userName" });

// Functionary-related associations
Functionary.belongsToMany(Subject, { through: "FunctionarySubjects", foreignKey: "functionaryId"});
Subject.belongsToMany(Functionary, { through: "FunctionarySubjects", foreignKey: "subjectId"});

Functionary.hasMany(File, { foreignKey: "functionaryId" });
File.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Application, { foreignKey: "functionaryId" });
Application.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Appointment, { foreignKey: "functionaryId" });
Appointment.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Group, { foreignKey: "functionaryId" });
Group.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Loan, { foreignKey: "functionaryId" });
Loan.belongsTo(Functionary, { foreignKey: "functionaryId" });

//Group and File
Group.hasMany(Student, { foreignKey: "section" });  
Student.belongsTo(Group, { foreignKey: "section" });

Group.belongsToMany(File, {through: "GroupFiles", foreignKey: "section"});
File.belongsToMany(Group, {through: "GroupFiles", foreignKey: "fileId"});

Group.hasMany(Class, { foreignKey: "section" });
Class.belongsTo(Group, { foreignKey: "section" });

// Application-related associations
Application.hasOne(File, { foreignKey: "applicationId", as: "file", unique: true });
File.belongsTo(Application, { foreignKey: "applicationId", unique: true });

Application.hasOne(PreRegistration, { foreignKey: "applicationId", as: "preregistration", unique: true });
PreRegistration.belongsTo(Application, { foreignKey: "applicationId", unique: true });

Application.hasOne(Loan, { foreignKey: "applicationId" });
Loan.belongsTo(Application, { foreignKey: "applicationId" });

// Student-related associations
Student.hasMany(Appointment, { foreignKey: "studentId" });
Appointment.belongsTo(Student, { foreignKey: "studentId" });

Student.hasMany(PreRegistration, { foreignKey: "studentId" });
PreRegistration.belongsTo(Student, { foreignKey: "studentId" });

// Caregiver-related associations
Caregiver.hasMany(Student, { foreignKey: "caregiverId" });
Student.belongsTo(Caregiver, { foreignKey: "caregiverId" });

//Grade-related associations
Student.hasMany(Grade, {foreignKey: {name: "studentId", allowNull: false} });
Grade.belongsTo(Student, {foreignKey: "studentId"});

Subject.hasMany(Grade, { foreignKey: {name: "subjectId", allowNull: false} });
Grade.belongsTo(Subject, { foreignKey: "subjectId" });

Functionary.hasMany(Grade, { foreignKey: {name: "functionaryId", allowNull: false} });
Grade.belongsTo(Functionary, { foreignKey: "functionaryId" });

//Class-related associations
Class.hasMany(Timetable, { foreignKey: "classId", onDelete: "CASCADE" });
Timetable.belongsTo(Class, { foreignKey: "classId", onDelete: "CASCADE" });

Subject.hasMany(Class, { foreignKey: {name: "subjectId", allowNull: false} });
Class.belongsTo(Subject, { foreignKey: "subjectId" });

Functionary.hasMany(Class, { foreignKey: "functionaryId" });
Class.belongsTo(Functionary, { foreignKey: "functionaryId" });

//Loan-related associations
Loan.belongsToMany(Supplies, { through: LoanSupplies, foreignKey: "loanId", otherKey: "suppliesId" });
Supplies.belongsToMany(Loan, { through: LoanSupplies, foreignKey: "suppliesId", otherKey: "loanId" });

//Flaw-related associations
Flaw.hasMany(Supplies, { foreignKey: "flawId" });
Supplies.belongsTo(Flaw, { foreignKey: "flawId" });



export { 
    Role, 
    User, 
    Functionary, 
    Subject, 
    Application, 
    File,
    PreRegistration,
    Appointment,
    Student,
    Caregiver,
    Group,
    Class,
    Grade,
    Timetable,
    Loan,
    LoanSupplies,
    Supplies,
    Flaw,

};