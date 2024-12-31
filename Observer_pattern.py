from abc import ABC, abstractmethod

# Observer Interface
class Observer(ABC):
    @abstractmethod
    def update(self, message):
        pass

# Subject Interface
class Subject(ABC):
    @abstractmethod
    def add_observer(self, observer):
        pass

    @abstractmethod
    def remove_observer(self, observer):
        pass

    @abstractmethod
    def notify_observers(self):
        pass

# EmailService Class (Implements Subject)
class EmailService(Subject):
    def __init__(self):
        self._observers = []  # List to hold observers
        self._message = ""

    def add_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self._message)

    def set_message(self, message):
        self._message = message
        self.notify_observers()

# EmailNotification Class (Implements Observer)
class EmailNotification(Observer):
    def update(self, message):
        print(f"Email Notification: {message}")

# ProjectNotification Class (Implements Observer)
class ProjectNotification(Observer):
    def update(self, message):
        print(f"Project Notification: {message}")

# Example Usage
if __name__ == "__main__":
    # Create Subject
    email_service = EmailService()

    # Create Observers
    email_notification = EmailNotification()
    project_notification = ProjectNotification()

    # Add Observers to Subject
    email_service.add_observer(email_notification)
    email_service.add_observer(project_notification)

    # Simulate sending a message
    email_service.set_message("A new project has been created!")
    # Output:
    # Email Notification: A new project has been created!
    # Project Notification: A new project has been created!

    # Simulate another message
    email_service.set_message("Your project has been updated!")
    # Output:
    # Email Notification: Your project has been updated!
    # Project Notification: Your project has been updated!
