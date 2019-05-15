# UZUAL

Feed your brains with habits for a better mood

## Light Theme

<p style="text-align:center; display: block;">
<img src="https://user-images.githubusercontent.com/2805320/57558626-b4542e00-737e-11e9-8bb7-7a5eeea5b22a.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57558625-b4542e00-737e-11e9-9cbf-afe2ac9fab7c.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57730883-baf1e680-7699-11e9-8d49-28cc86032933.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971312-4a12e080-6b69-11e9-8aa1-f1c5fd518066.PNG" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971311-497a4a00-6b69-11e9-9cb6-45100adb61c6.PNG" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971310-497a4a00-6b69-11e9-8568-5e6a33cfc8db.PNG" width="40%" />
</p>

## Dark Theme

<p style="text-align:center; display: block;">
<img src="https://user-images.githubusercontent.com/2805320/57559606-0ac36b80-7383-11e9-8a25-3cebefb1821a.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57559607-0ac36b80-7383-11e9-91c5-c9759795dee9.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57730880-baf1e680-7699-11e9-84c8-622243a5e6c4.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57559608-0ac36b80-7383-11e9-82fb-ee1e49f0fe08.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57559611-0b5c0200-7383-11e9-9b9d-38e8d3e1afb7.png" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/57559612-0b5c0200-7383-11e9-8873-3e5c9bef13bf.png" width="40%" />
</p>

```graphql
mutation createUser {
  signup(
    email: "mironcatalin@gmail.com"
    name: "Catalin Miron"
    password: "password"
  ) {
    token
  }
}

mutation signin {
  login(email: "mironcatalin@gmail.com", password: "password") {
    token
  }
}

# mutation addHabit{
#   addHabit(title:"1 Coffee / day", description:"Just one coffee and see how it feels"){
#     id
#   }
# }

# mutation addDailyHabit{
#   addDailyHabit(habitId:"cjutuwgbu000t0765vjdje6n5", done: true, date: "2019-04-09"){
#     id
#   }
# }

query me {
  me {
    name
    email
    pushToken
    id
    isPro
  }

  moods(first: 5, orderBy: date_DESC) {
    id
    type
    date
  }
  habits(first: 5) {
    title
    description
    starred
    habits(first: 5, orderBy: date_DESC) {
      id
      date
      done
    }
  }
}

query getHabits {
  habits {
    id
    title
    description
    habits {
      id
      done
      date
    }
  }
}

query myMoods {
  moods(
    where: { date_gte: "2019-03-01", date_lte: "2019-03-30" }
    orderBy: date_ASC
  ) {
    id
    type
    date
  }
}

mutation setMood {
  setMood(date: "2019-04-23", type: Frown) {
    id
  }
}

mutation setDailyHabit {
  setDailyHabit(
    id: "cjuxtixuk0066073847pvhos9"
    done: false
    date: "2019-04-01"
  ) {
    done
  }
}

//For changing the date for the current month + refreshing

this.props.data.stopPolling();
await this.props.data.refetch({
  start,
  end
});
this.props.data.startPolling(5000);
```
