import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://www.eventbrite.com/blog/wp-content/uploads/2022/04/meetup-product-launch-1.jpg",
//     address: "Some address 7, 5678 some street",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://cdn.dribbble.com/assets/meetups/meetup-photo-1-cdb30d3bca9517ad18bd8cc3d018a7761fc821078d06ec8279c5285a6a6d5c52.jpg",
//     address: "Some address 9, 678 some street",
//     description: "This is a Second meetup",
//   },
// ];
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   const req=context.req;
//   const res=context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  //fetch data from api
  const client = await MongoClient.connect(
    "mongodb+srv://chinu1297:Anjana123@cluster0.ltqmzok.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        image: meetup.data.image,
        address: meetup.data.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
