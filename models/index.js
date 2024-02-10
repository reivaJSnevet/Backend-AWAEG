import Role from "./Role.js";
import User from "./User.js";
import Person from "./Person.js";
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
import Flaw from "./Flaw.js";


// Role and User
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// Person-related associations
Person.hasOne(User, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE", });
User.belongsTo(Person, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE" });

Person.hasOne(Functionary, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE" });
Functionary.belongsTo(Person, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE" });

Person.hasOne(Student, { foreignKey: { name: "personId", allowNull: false }, unique: true, onDelete: "CASCADE" });
Student.belongsTo(Person, { foreignKey: { name: "personId", allowNull: false }, unique: true, onDelete: "CASCADE" });

Person.hasOne(Caregiver, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE", onUpdate: "CASCADE"});
Caregiver.belongsTo(Person, { foreignKey: { name: "personId", allowNull: false }, onDelete: "CASCADE", onUpdate: "CASCADE"});

Person.hasMany(Loan, { foreignKey: {name: "userName", allowNull: false }, onDelete: "CASCADE", as: "Debtor" });
Loan.belongsTo(Person, { foreignKey: {name: "userName", allowNull: false }, onDelete: "CASCADE", as: "Debtor" });

// Functionary-related associations
Functionary.belongsToMany(Subject, { through: "FunctionarySubjects", foreignKey: "functionaryId" });
Subject.belongsToMany(Functionary, { through: "FunctionarySubjects", foreignKey: "subjectId" });

Functionary.hasMany(File, { foreignKey: "functionaryId" });
File.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Application, { foreignKey: "functionaryId" });
Application.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Appointment, { foreignKey: "functionaryId" });
Appointment.belongsTo(Functionary, { foreignKey: "functionaryId" });

Functionary.hasMany(Group, { foreignKey: "functionaryId", onDelete: "SET NULL" });
Group.belongsTo(Functionary, { foreignKey: "functionaryId", onDelete: "SET NULL" });

//Group and File
Group.belongsToMany(File, {through: "GroupFiles", foreignKey: "section"});
File.belongsToMany(Group, {through: "GroupFiles", foreignKey: "fileId"});

// Application-related associations
Application.hasOne(File, { foreignKey: "applicationId", as: "file" });
File.belongsTo(Application, { foreignKey: "applicationId" });

Application.hasOne(PreRegistration, { foreignKey: "applicationId", as: "preregistration" });
PreRegistration.belongsTo(Application, { foreignKey: "applicationId" });

// Student-related associations
Student.hasMany(Appointment, { foreignKey: "studentId" });
Appointment.belongsTo(Student, { foreignKey: "studentId" });

Student.hasMany(PreRegistration, { foreignKey: "studentId" });
PreRegistration.belongsTo(Student, { foreignKey: "studentId" });

Caregiver.hasMany(Student, { foreignKey: "caregiverId" });
Student.belongsTo(Caregiver, { foreignKey: "caregiverId" });

Group.hasMany(Student, { foreignKey: "section" });  
Student.belongsTo(Group, { foreignKey: "section" });

//Grade-related associations
Student.hasMany(Grade, {foreignKey: {name: "studentId", allowNull: false} });
Grade.belongsTo(Student, {foreignKey: "studentId"});

Subject.hasMany(Grade, { foreignKey: {name: "subjectId", allowNull: false} });
Grade.belongsTo(Subject, { foreignKey: "subjectId" });

Functionary.hasMany(Grade, { foreignKey: {name: "functionaryId", allowNull: false} });
Grade.belongsTo(Functionary, { foreignKey: "functionaryId" });

//Class-related associations
Group.hasMany(Class, { foreignKey: "section" });
Class.belongsTo(Group, { foreignKey: "section" });

Class.hasMany(Timetable, { foreignKey: "classId", onDelete: "CASCADE" });
Timetable.belongsTo(Class, { foreignKey: "classId", onDelete: "CASCADE" });

Subject.hasMany(Class, { foreignKey: {name: "subjectId", allowNull: false} });
Class.belongsTo(Subject, { foreignKey: "subjectId" });

Functionary.hasMany(Class, { foreignKey: "functionaryId" });
Class.belongsTo(Functionary, { foreignKey: "functionaryId" });

//Relacion de uno a uno entre !0an y F1aw
Loan.hasOne(Flaw, { foreignKey: "loanId", mandatory: false });
Flaw.belongsTo(Loan, { foreignKey: "loanId", mandatory: false });

Application.hasOne(Loan, { foreignKey: "applicationId"});
Loan.belongsTo(Application, { foreignKey: "applicationId"});


export { 
    Role, 
    User, 
    Person,
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
    Flaw,
};