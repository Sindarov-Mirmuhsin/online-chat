const jwt = require('../utils/jwt');
const { read, write } = require('../utils/model');

const REGISTER = (req, res) => {
	try {
		let admins = read('admins');
		let { username, password } = req.body;
		
		let admin = admins.find((admin) => admin.username == username);
		
		if (admin) {
			throw new Error('this username exists');
		}
		
		let newAdmin = {
			userId: admins.length ? admins.at(-1)?.userId + 1 : 1,
			username,
			password,
		};
		admins.push(newAdmin);
		write('admins', admins);
		
		return res.status(201).json({
			status: 201,
			message: 'created',
			data: newAdmin,
			token: jwt.sign({ userId: newAdmin.userId }),
		});
	} catch (error) {
		res.status(400).json({ status: 400, message: error.message });
	}
};

const LOGIN = (req, res) => {
	try {
		let admins = read('admins');
		let { username, password } = req.body;
		
		let admin = admins.find(
			(admin) => admin.username == username && admin.password == password,
			);
			
			if (!admin) {
				throw new Error('wrong username or password');
			}
			
			return res.status(200).json({
				status: 200,
				message: 'ok',
				data: admin,
				token: jwt.sign({ userId: admin.userId }),
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	};
	
	const catageryInfo = (req, res) => {
		try {
			const category = read('categories');
			const subCategory = read('subCategories');
			const product = read('products');
			res.send({ category, subCategory, product});
			write('categories', categories);
			return res.status(200).json({
				status: 200,
				message: 'ok',
				data: newCategory,
				token: jwt.sign({ category_id: newCategory.category_id }),
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}
	
	
	const categoryPost = (req, res) => {
		try {
			const categories = read('categories');
			let { category_name } = req.body;
			
			let newCategory = {
				category_id: categories.length ? categories.at(-1)?.category_id + 1 : 1,
				category_name,
			};
			
			categories.push(newCategory);
			write('categories', categories);
			return res.status(200).json({
				status: 200,
				message: 'ok',
				data: newCategory,
				token: jwt.sign({ category_id: newCategory.category_id }),
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	};
	
	const subCategoryPost = (req, res) => {
		try {
			const subCategories = read('subCategories');
			
			let { sub_category_name, category_id } = req.body;
			
			let newsubCategory = {
				category_id,
				sub_category_id: subCategories.length
				? subCategories.at(-1)?.sub_category_id + 1
				: 1,
				sub_category_name,
			};
			
			subCategories.push(newsubCategory);
			write('subCategories', subCategories);
			return res.status(200).json({
				status: 200,
				message: 'ok',
				data: newsubCategory,
				token: jwt.sign({
					sub_category_id: newsubCategory.sub_category_id,
				}),
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	};
	
	const productsPost = (req, res) => {
		try {
			const products = read('products');
			
			let { product_id, sub_category_id, model, product_name, color, price } =
			req.body;
			
			let newProduct = {
				product_id,
				sub_category_id,
				model,
				product_name,
				color,
				price,
			};
			
			products.push(newProduct);
			write('products', products);
			return res.status(200).json({
				status: 200,
				message: 'ok',
				data: newProduct,
				token: jwt.sign({
					sub_category_id: newProduct.sub_category_id,
				}),
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	};
	
	const categoryDelete = (req, res) => {
		try {
			let categories = read('categories');
			let { category_id } = req.params;
			let category = categories.find(
				(category) => category.category_id == category_id,
				);
				categories.splice(category, 1);
				write('categories', categories);
				
				return res.status(202).json({
					status: 204,
					message: 'deleted',
				});
			} catch (error) {
				res.status(400).json({ status: 400, message: error.message });
			}
		};
		
		const subCategoryDelete = (req, res) => {
			try {
				let products = read('products');
				
				let { sub_category_id } = req.params;
				
				let subCategories = read('subCategories');
				
				const subCategory = subCategories.filter(
					(a) => a.sub_category_id != sub_category_id,
					);
					
					const filtered = subCategories.filter(
						(a) => a.sub_category_id == sub_category_id,
						);
						
						let qwerty = [];
						
						for (let i of filtered) {
							products.map((a) => {
								if (a.sub_category_id != i.sub_category_id) {
									qwerty.push(a);
								}
							});
						}
						
						write('subCategories', subCategory);
						write('products', qwerty);
						return res.status(202).json({
							status: 204,
							message: 'deleted',
						});
					} catch (error) {
						res.status(400).json({ status: 400, message: error.message });
					}
				};
				
				const productPut = (req, res) => {
					try {
						let products = read('products');
						let { product_id } = req.params;
						let { sub_category_id, model, product_name, color, price } = req.body;
						const foundProduct = products.findIndex((e) => e.product_id == product_id);
						
						if (foundProduct >= 0) {
							(products[foundProduct].model = model
								? model
								: products[foundProduct]?.model),
								(products[foundProduct].product_name = product_name
									? product_name
									: products[foundProduct]?.product_name),
									(products[foundProduct].color = color
										? color
										: products[foundProduct]?.color),
										(products[foundProduct].price = price
											? price
											: products[foundProduct]?.price);
										}
										
										let putProduct = {
											product_id,
											sub_category_id,
											model,
											product_name,
											color,
											price,
										};
										products.push(putProduct);
										write('products', products);
										return res.status(202).json({
											status: 204,
											message: 'updated',
										});
									} catch (error) {
										res.status(400).json({ status: 400, message: error.message });
									}
								};
								
								const categoryPut = (req, res) => {
									try {
										let categories = read('categories');
										let { category_id } = req.params;
										let { category_name } = req.body;
										const foundcategory = categories.findIndex(
											(e) => e.category_id == category_id,
											);
											
											if (foundcategory > 0) {
												categories[foundProduct].category_name = category_name
												? category_name
												: products[foundProduct]?.category_name;
											}
											
											let putCategory = {
												category_name,
											};
											categories.push(putCategory);
											write('categories', categories);
											return res.status(202).json({
												status: 204,
												message: 'updated',
											});
										} catch (error) {
											res.status(400).json({ status: 400, message: error.message });
										}
									};
									
									const subCategoryPut = (req, res) => {
										try {
											let subCategories = read('subCategories');
											let { sub_category_id } = req.params;
											let { category_id, sub_category_name } = req.body;
											const foundSub = subCategories.findIndex(
												(e) => e.sub_category_id == sub_category_id,
												);
												
												if (foundSub > 0) {
													subCategories[foundSub].sub_category_name = sub_category_name
													? sub_category_name
													: subCategories[foundSub]?.sub_category_name;
													subCategories[foundSub].sub_category_id = sub_category_id
													? sub_category_id
													: subCategories[foundSub]?.sub_category_id;
												}
												
												let putSub = {
													sub_category_name,
													sub_category_id,
													category_id,
												};
												subCategories.push(putSub);
												write('subCategories', subCategories);
												return res.status(202).json({
													status: 204,
													message: 'updated',
												});
											} catch (error) {
												res.status(400).json({ status: 400, message: error.message });
											}
										};
										
										const productDelete = (req, res) => {
											try {
												let products = read('products');
												let { product_id } = req.params;
												let product = products.find((product) => product.product_id == product_id);
												products.splice(product, 1);
												write('products', products);
												
												return res.status(202).json({
													status: 204,
													message: 'deleted',
												});
											} catch (error) {
												res.status(400).json({ status: 400, message: error.message });
											}
										};
										
										module.exports = {
											REGISTER,
											LOGIN,
											catageryInfo,
											categoryPost,
											subCategoryPost,
											productsPost,
											categoryDelete,
											subCategoryDelete,
											productDelete,
											productPut,
											subCategoryPut,
											categoryPut,
										};
										