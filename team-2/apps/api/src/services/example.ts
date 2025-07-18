interface Person {
  greet(): void;
}

class Student implements Person {
  greet() {
    console.log(`hallo`);
  }
}

class Teacher implements Person {
  greet(): void {
      throw new Error("Method not implemented.");
  }
}