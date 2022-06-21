# SOLID

1. SINGLE RESPONSIBILITY PRINCIPLE
2. OPEN/CLOSED PRINCIPLE
3. LISKOV SUBSTITUTION PRINCIPLE
4. INTERFACE SEGREGATION PRINCIPLE
5. DEPENDENCY INVERSION PRINCIPLE

---

1. Each class, or function, must have an unique responsibility, it isn't nice to have a function creating a feedback and sending e-mail;
2. Classes of my application should be open to extend, but closed to modification; (OOP focus)
3. A parent class must be replaceable by a inheritance and should continues working, example: If I have a Bird class function being used, when I replace it with a Hawk class, everything should be ok, since Hawk can have flying, biting, etc. functions;
4. Try to use only the must-have of a class when implementing;
5. Must be externally explicit which dependencies a class will need to work, like, a feedback class depends of nodemailer to send e-mails, it shouldn't search for nodemailer, but must use it;
