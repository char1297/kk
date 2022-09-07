import { Fragment } from "react";

import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        ></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
// export async getStaticPaths(){
//   return{};
// };

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://chinu1297:Anjana123@cluster0.ltqmzok.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://chinu1297:Anjana123@cluster0.ltqmzok.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");
  const selectedMeetup = await meetupsCollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  //fetch data for single meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        description: selectedMeetup.data.description,
        image: selectedMeetup.data.image,
        address:selectedMeetup.data.address
      },
    },
  };
}
export default MeetupDetails;
