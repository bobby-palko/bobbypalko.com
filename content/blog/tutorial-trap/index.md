---
title: Escaping The Tutorial Trap
date: "2020-09-27T13:36Z"
description: "How I'm trying to make my own things"
---

I love tutorials. They make it easy to dive into a new topic, and usually you can have something to show for it when you're done. And I'm proud when I complete them; "look at me! I did it!"

I also _hate_ tutorials. They're too safe. There's this gap between what you've learned, and creating something new that isn't the __exact. same. thing.__

At least that's how it is for me. The difference between `{training-wheels: on}` and `{training-wheels: off}` feels too great. I was scared to make the jump, but sometimes a trial by fire is the best way. 

I decided to go with a classic - make a to do list app. [Here's the repo](https://github.com/bobby-palko/todo-list). I just finished a Udemy course covering all sorts of web development, and had a couple examples to work off of. I told myself I would only use what I remembered; I would look up the docs or find other blogs when I got stuck. And boy did I get stuck. 

The front end of this app is created with React, and the backend with Express and MongoDB. It's a MERN stack (the N stands for Nodejs). I wanted to make the data persist, because I plan on using this to keep track of what projects I'm working on. Making the React app wasn't too bad; the ideas were fresh in my head, and I had a basic, independently working front end up pretty quickly. I did need a little refresher on the backend; for that I examined some of my old code to see what I did, and explored some blogs to see what good practices are to keep things organized. Any new code I came across and wanted to implement, I made sure I fully understood what was happening before I pasted it in.

Let me say that again.

> ## Always fully understand the code you're pasting into a project

I may be a beginner, but I firmly believe you should always know what your code is doing. Which is why I struggled so much getting the front and back to talk to each other. But more on that in a second.

So, the front end works by itself, and my back end seems to be working as well. Now to just join them together! Easy, right? 

Wrong.

Getting the initial dataset to load into an array before I tried to loop over that array was proving way more difficult that I imagined. If I'm calling the API to get the data and put it into an array before looping over the array, shouldn't that work? Well, since I'm using React state in this app, the best way to get external data is the `useEffect()` function. I ran into a bit of a problem with this, since `useEffect()` gets called _after_ React renders the page. Since my loop is essentially creating components, it breaks.

After hours of banging my head against the desk, reading up on `useEffect()` and `async/await` (since that concept was new to me as well), I finally came up with this solution:

```js
  const [isLoaded, setLoad] = useState(false);

  const [listItems, setListItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const res = await api.getAllItems();
        setListItems(res.data.data);
        setLoad(true);      
      }
      fetchData();
    }, [isLoaded]);
```

And in the return statement of this component:

```js
{isLoaded && listItems.map((item,index) => {
            return <Item 
              key={item._id}
              id={item._id} 
              name={item.name} 
              notes={item.notes} 
              delete={deleteItem}
            />
          })}
```

By short circuting the `&&` statement, we're only creating these Item components if `isLoaded` is true. `isLoaded` is false by default, and only turns true once we've updated our `listItems`(I may go into React state in another post, because it warrants its own). 

Adding and deleting items is much, much simpler:

```js
  function addItem(newItem){
    api.addItem(newItem);
    setLoad(false);
  };

  function deleteItem(id){
    api.deleteItemByID(id);
    setLoad(false);
  };
```

We set `isLoaded` back to false so the `useEffect()` function fires again, and we reload our data from the database. I chose this way so there is only a single source of truth; there's no possibility of a local version being out of sync. Is there a better solution? Probably. But it's my first real, training wheel free app. 

There's still much more to be done to it, but I'd like to get it live soon and start using it as is. Feel free to check out the code and let me know what you think. There's no comments, but [make an issue](https://github.com/bobby-palko/todo-list/issues) on the repo if you'd like, even if it's just to provide some feedback. I'll share a URL here once it's live. 
