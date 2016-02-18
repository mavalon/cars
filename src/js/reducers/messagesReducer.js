




const initialState = {
  inbox: [
    {
      from: {
        name: 'Cheryl @ HR'
      },
      body: 'Hi Pav, I\'m really sorry about Dirk, he\'s been let go.',
      subject: 'Conflict Resolution',
      read: false
    },
    {
      from: {
        name: 'Dirk'
      },
      body: 'Hey Pav, I need you to like sell ALL the crickets... like yesterday! Bitch.',
      subject: 'SELL MORE CARS MOFO!',
      read: true
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
  default:
    return {
      ...state
    };
  }
}
