# Requirements

~ Ensure your HTML form is working and submitting data into the database as expected.
I've successfully added rows to my db table from the guestbook form

~ Confirm that your project is functional on multiple screen sizes using either media queries or dynamic CSS styling.
I did all my styling in the mobile view

~ Create a working GET API route in your server.
Yep, two of them

~ Create a working POST API route in your client.
Done and done

~ Seed your database with realistic-looking ‘dummy’ data through the Supabase query editor or a seed file in your server. Ensure that this is saved and submitted (in a screenshot or seed file form) so it can be marked and tested efficiently.

I didn't use a seed file but I did set up the table in the first place with an SQL query and added a test record to it with another one. They're in queries.sql. I then added a few more records either with the query or the form, also on different dates to test the filter.

# Frustrations

I honestly did try to make a wireframe with OK so, but I got so annoyed that it wouldn't do what I wanted it do that I gave up wasting time after 5 minutes. I really am artistically challenged!

# Extra bits

I didn't like the idea of visitors being able to delete messages (whose messages!) or leave likes without implementing a full user sign-up and log-in system, so I've just added a little date filter to select messages from a date range as an extra nice-to-have thing.

I've made sure all my form fields are required to avoid gaps in my database, and added a little fade-in to the tab switch just because.

# Reflections

I decided to use tabs because it allowed me more room on a mobile view without pushing the messages down under the form and off the screen. Also it saves having to use any sort of setinterval repeated polling of the api because I can use the tab click event to load the messages afresh when the user goes to that tab to see them.

There is a decidedly long wait for the (free) database to respond at first so I added a 'progress bar' just for fun and so it looks like something's happening (it is, we're waiting for Supabase to wake up).
