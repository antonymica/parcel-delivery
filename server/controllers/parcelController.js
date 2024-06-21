const Parcel = require("../models/Parcel");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  const messages = await req.flash("info");

  const locals = {
    title: "Parcel Delivery",
    description: "NodeJs Parcel Delivery System",
  };

  let perPage = 7;
  let page = req.query.page || 1;

  try {
    const parcels = await Parcel.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Parcel.countDocuments({});

    res.render("index", {
      locals,
      parcels,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

/** GET /
 *  About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "NodeJs Parcel Delivery System",
  };

  try {
    return res.render("about", { locals });
  } catch (error) {
    console.log(`Cannot get about page\n${error}`);
  }
};

/** GET /
 *  New Parcel
 */
exports.addParcel = async (req, res) => {
  const locals = {
    title: "Add New Parcel - NodeJs",
    description: "NodeJs Parcel Delivery System",
    parcel_status: ["In Charge", "In Progress", "Delivered"],
    parcel_type: [
      "Standard",
      "Oversized",
      "Hazardous",
      "Heavy",
      "Fragile",
      "Perishable",
      "Valuable",
      "Express",
      "Return",
    ],
  };
  return res.render("customer/add", locals);
};

/** POST /
 *  New Parcel
 */
exports.postParcel = async (req, res) => {
  console.log(req.body);

  const newParcel = new Parcel({
    exp_name: req.body.exp_name,
    exp_tel: req.body.exp_tel,
    exp_email: req.body.exp_email,
    exp_address: req.body.exp_address,

    dest_name: req.body.dest_name,
    dest_tel: req.body.dest_tel,
    dest_email: req.body.dest_email,
    dest_address: req.body.dest_address,

    courser_name: req.body.courser_name,
    courser_tel: req.body.courser_tel,
    courser_email: req.body.courser_email,

    parcel_desc: req.body.parcel_desc,
    parcel_status: req.body.parcel_status,
    parcel_type: req.body.parcel_type,
  });

  try {
    await Parcel.create(newParcel);
    await req.flash("info", "New Parcel has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(`Cannot add the parcel: \n${error}`);
  }
};

/**
 * GET /
 * View
 */
exports.view = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ _id: req.params.id });

    const locals = {
      title: "View Parcel Data",
      description: "Free NodeJs Parcel Delivery System",
    };

    res.render("customer/view", {
      locals,
      parcel,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Parcel Data
 */
exports.edit = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Parcel Data",
      description: "Free NodeJs Parcel Delivery System",
    };

    res.render("customer/edit", {
      locals,
      parcel,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * Update Parcel Data
 */
exports.editPost = async (req, res) => {
  try {
    await Parcel.findByIdAndUpdate(req.params.id, {
      exp_name: req.body.exp_name,
      exp_tel: req.body.exp_tel,
      exp_email: req.body.exp_email,
      exp_address: req.body.exp_address,

      dest_name: req.body.dest_name,
      dest_tel: req.body.dest_tel,
      dest_email: req.body.dest_email,
      dest_address: req.body.dest_address,

      courser_name: req.body.courser_name,
      courser_tel: req.body.courser_tel,
      courser_email: req.body.courser_email,

      parcel_desc: req.body.parcel_desc,
      parcel_type: req.body.parcel_type,
      parcel_status: req.body.parcel_status,

      updatedAt: Date.now(),
    });
    // await res.redirect(`/edit/${req.params.id}`);
    await req.flash(
      "info",
      `Parcel {${req.params.exp_name}} has been updated.`
    );
    res.redirect("/");
    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Parcel Data
 */
exports.deleteParcel = async (req, res) => {
  try {
    await Parcel.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Parcel Data
 */
exports.searchParcels = async (req, res) => {
  const locals = {
    title: "Search Parcel Data",
    description: "Free NodeJs Parcel Delivery System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const parcels = await Parcel.find({
      $or: [
        { parcel_type: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { parcel_desc: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { parcel_status: { $regex: new RegExp(searchNoSpecialChar, "i") } },

        { exp_name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { exp_address: { $regex: new RegExp(searchNoSpecialChar, "i") } },

        { dest_name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { dest_address: { $regex: new RegExp(searchNoSpecialChar, "i") } },

        { courser_name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      parcels,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
