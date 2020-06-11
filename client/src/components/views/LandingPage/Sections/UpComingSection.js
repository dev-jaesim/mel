import React from "react";
import { Table } from "antd";

function UpComingSection() {
  const dataSource = [
    {
      key: "1",
      date: "26 June 2020",
      activity: "Application close for Year 5 entry in 2021",
    },
    {
      key: "2",
      date: "9 June - 21 August 2020",
      activity: "Parents request any disability provisions",
    },
    {
      key: "3",
      date: "30 June - 3 July 2020",
      activity: "Pricipals verify student infromation",
    },
    {
      key: "4",
      date: "2 September 2020",
      activity:
        "Parents receive 'Test Authority' advice\nParents advised of disability provisions granted for the test",
    },
    {
      key: "5",
      date: "16 September 2020",
      activity: "Opportunity Class Placement Test",
    },
    {
      key: "6",
      date: "25 September 2020",
      activity: "Last day to change school choices",
    },
    {
      key: "7",
      date: "November 2020",
      activity: "Selection Process Occurs",
    },
    {
      key: "8",
      date: "Overnight on 1\nDecember 2020",
      activity: "Placement outcom information sent to parents",
    },
    {
      key: "9",
      date: "From 1 December 2020",
      activity: "Parent accept or decline offers",
    },
    {
      key: "10",
      date: "Mid-December 2020",
      activity: "Reserve list activated",
    },
    {
      key: "11",
      date: "Late January 2021",
      activity:
        "Parents successful students sent 'Authority to attend' letters to take to the school on the first day of term 2021",
    },
    {
      key: "12",
      date: "27 January 2021",
      activity:
        "At 5 pm, students with accepted offers are withdrwan from reserve list",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
  ];

  return (
    <div className="container-padding bgc-white">
      <div className="main-slogan why-works-title margin-y-2">
        Upcoming Events
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 6 }}
        className="content-center width-80"
      />
    </div>
  );
}

export default UpComingSection;
