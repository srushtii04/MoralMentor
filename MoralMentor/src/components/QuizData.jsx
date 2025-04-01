const QuizData = [
  {
    question: "You discover that your best friend Emily has an incredible talent for drawing. She's been secretly entering art competitions and winning prizes but hasn't told anyone because she's afraid of being judged. She begs you not to tell anyone about her talent. What would you do?",
    options: [
      { text: "Respect her wishes and keep her secret.", isCorrect: true, consequence: "You respected her privacy, and she feels more comfortable sharing when she’s ready." },
      { text: "Convince her to embrace her talent and share it with the world.", isCorrect: false, consequence: "She feels pressured and withdraws further from expressing herself." }
    ]
  },
  {
    question: "You find a lost wallet on the street with money and an ID card inside. What would you do?",
    options: [
      { text: "Take the money and leave the wallet behind.", isCorrect: false, consequence: "This is dishonest, and the rightful owner loses their belongings." },
      { text: "Try to contact the owner and return it.", isCorrect: true, consequence: "The owner is grateful, and you set a great example of honesty." }
    ]
  },
  {
    question: "You witness a classmate being bullied at school. What is the best course of action?",
    options: [
      { text: "Ignore it since it’s not your problem.", isCorrect: false, consequence: "Ignoring bullying allows it to continue, making the victim feel alone." },
      { text: "Speak up or report it to a teacher.", isCorrect: true, consequence: "Reporting helps the victim and discourages bullying in your school." }
    ]
  },
  {
    question: "You have an upcoming exam but your friends invite you to a party. What would you do?",
    options: [
      { text: "Study first, then decide if you have time for the party.", isCorrect: true, consequence: "You balance fun and responsibility while preparing for success." },
      { text: "Go to the party and hope to do well anyway.", isCorrect: false, consequence: "This could impact your performance and lead to regret later." }
    ]
  },
  {
    question: "Your team is struggling on a group project, but you understand the topic well. What should you do?",
    options: [
      { text: "Help your teammates understand the topic.", isCorrect: true, consequence: "Your team improves, and you strengthen collaboration skills." },
      { text: "Let them figure it out themselves.", isCorrect: false, consequence: "Your team struggles, and the project suffers." }
    ]
  },
  {
    question: "You see a stranger drop their phone while walking. What would you do?",
    options: [
      { text: "Pick it up and return it to them.", isCorrect: true, consequence: "The person appreciates your honesty and kindness." },
      { text: "Keep walking, it’s not your problem.", isCorrect: false, consequence: "The person loses their phone, and you miss an opportunity to help." }
    ]
  },
  {
    question: "Your younger sibling is struggling with homework and asks for help. What would you do?",
    options: [
      { text: "Help them understand the topic.", isCorrect: true, consequence: "They feel encouraged and perform better in school." },
      { text: "Tell them to figure it out on their own.", isCorrect: false, consequence: "They feel frustrated and may struggle even more." }
    ]
  },
  {
    question: "You notice a classmate sitting alone during lunch every day. What would you do?",
    options: [
      { text: "Sit with them and start a conversation.", isCorrect: true, consequence: "You make a new friend and help them feel included." },
      { text: "Ignore them, it’s not your problem.", isCorrect: false, consequence: "They continue feeling isolated and lonely." }
    ]
  },
  {
    question: "You forgot to do your homework, and your friend offers to let you copy theirs. What should you do?",
    options: [
      { text: "Politely decline and accept the consequences.", isCorrect: true, consequence: "You take responsibility and learn from the mistake." },
      { text: "Copy it to avoid getting in trouble.", isCorrect: false, consequence: "This is dishonest and doesn’t help you learn." }
    ]
  },
  {
    question: "You borrowed a book from the library and accidentally damaged it. What is the right thing to do?",
    options: [
      { text: "Report it and offer to replace or repair it.", isCorrect: true, consequence: "The library appreciates your honesty and responsibility." },
      { text: "Return it without saying anything.", isCorrect: false, consequence: "This could cause problems for the next reader and damage trust." }
    ]
  }
];

export default QuizData;
