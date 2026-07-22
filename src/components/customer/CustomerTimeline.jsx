function CustomerTimeline({ customer }) {

  const timeline = [

    {
      date: customer.joinedOn || "Today",
      title: "Joined LUCK-G'S Family",
      icon: "🎉"
    }

  ];

  return (

    <div className="timeline">

      <h2>Customer Timeline</h2>

      {timeline.map((item,index)=>(

        <div
          key={index}
          className="timeline-item"
        >

          <div className="timeline-icon">

            {item.icon}

          </div>

          <div>

            <h4>{item.title}</h4>

            <p>{item.date}</p>

          </div>

        </div>

      ))}

    </div>

  );

}

export default CustomerTimeline;