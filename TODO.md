# TODO

## Populate empty week
1. initializeEmptyWeek
    1. Need Weekday + date + id -> check if Luxon can calculate  based off weekNumber
    1. Do not use inflate or createRecord.
    1. Rather fill all values empty
        1. Weekday -> Sun to Sat = use prepopulated array
        1. date -> check Luxon
        1. try: 
        ```js        
        const yearNumber = 2020;
        const weekNumber = 3;
        const dt = DateTime.fromObject({
        weekYear: yearNumber,
        weekNumber: weekNumber
        });

        const dateFromStr = dt.startOf('week');
        console.log(dateFromStr.toISO()); // last Monday at 00:00:00
        const dateToStr = dt.endOf('week');
        console.log(dateToStr.toISO()); // next Sunday at 23:59:59
```

1. get from storage
    1. getweek
1. if some (or nothing), fill empty spaces
    1. find by id and replace empty space




Update placeholder on new entry and write to DOM

Change "Today" to "Week x: 31 July - 6 Aug"

Get current time. Suggest to use rounded value to nearest 5min; or manual input 

increments of/round to 15min

getWeekly
- 