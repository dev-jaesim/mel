import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
function TestimonialSection() {
  return (
    <div className="testimonial-padding">
      <div className="why-works-title margin-y-2 font-size-2 font-color-black">
        “I come from a poor family. At home it’s one room, just a room we live
        in. When I was a child, I used to fear mathematics. But now, I am in
        love with mathematics because of MRT Edu Lab.”
      </div>
      <div className="text-align-right">
        <span>
          <strong>Anjali</strong>, India
        </span>
        &nbsp;&nbsp;
        <Avatar size={100} icon={<UserOutlined />} />
      </div>
    </div>
  );
}

export default TestimonialSection;
