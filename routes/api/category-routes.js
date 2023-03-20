const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try { // set up a try/catch block
  const categoryData = await Category.findAll({
    //include products that belong to a category
    include: [{ model: Product}],
  }); //status = 200 if it works
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({
        message: 'there is no category with that id...'});
        return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCategory = await Category.create(req.body, {
    category_name: req.body.category_name,
  });
  res.json(newCategory);
} catch (err) {
  res.status(500).json({
    message: 'no dice' });
    return;
}
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!updatedCategory[0]) {
    res.status(404).json({
      message: 'no category found with that id' });
      return;
  }
  res.status(200).json(updatedCategory);
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
        const deletedCategory = await Category.destroy(req.body, {
          id: req.params.id,
        });
        if (!deletedCategory[0]) {
          res.status(404).json({
            message: 'no category with that id'});
            return;
        }
        res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
