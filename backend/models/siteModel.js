const SiteSchema = new mongoose.Schema({
  projectRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  name: String,
  location: String,
  siteType: String,
  cameras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }]
});
module.exports = mongoose.model('Site', SiteSchema);