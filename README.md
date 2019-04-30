# UZUAL
Feed your brains with habits for a better mood

<p style="text-align:center; display: block;">
<img src="https://user-images.githubusercontent.com/2805320/56971313-4a12e080-6b69-11e9-84e9-bdfdf0359f5d.PNG" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971312-4a12e080-6b69-11e9-8aa1-f1c5fd518066.PNG" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971311-497a4a00-6b69-11e9-9cb6-45100adb61c6.PNG" width="40%" />
<img src="https://user-images.githubusercontent.com/2805320/56971310-497a4a00-6b69-11e9-8568-5e6a33cfc8db.PNG" width="40%" />
</p>



```graphql
mutation createUser{
  signup(email:"mironcatalin@gmail.com", name:"Catalin Miron", password:"password") {
    token
  }
}

mutation signin{
  login(email:"mironcatalin@gmail.com", password:"password") {
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

query getHabits{
  habits{
    id
    title
    description
    habits{
      id
      done
      date
    }
  }
}

query myMoods {
  moods(where:{
    date_gte:"2019-03-01",
    date_lte:"2019-03-30"
  }, orderBy: date_ASC){
    id
    type
    date
  }
}

mutation setMood{
  setMood(date: "2019-04-23", type: Frown) {
    id
  }
}

mutation setDailyHabit{
  setDailyHabit(id:"cjuxtixuk0066073847pvhos9", done: false, date:"2019-04-01") {
    done
  }
}
```
