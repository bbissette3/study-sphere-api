const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create({
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
      userId: req.userId,
    });
    res.send({ message: "Topic created successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.update(
      {
        title: req.body.title,
        subject: req.body.subject,
        description: req.body.description,
      },
      {
        where: { id: req.params.id, userId: req.userId },
      }
    );
    // ...
  } catch (err) {
    // ...
  }
};
