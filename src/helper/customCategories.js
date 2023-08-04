import Category from "@/models/category";

export const createCustomCategories = async (user) => {
    const category1 = new Category({
        name: "transportation",
        transactions: [],
        user,
    });

    const category2 = new Category({
        name: "entertainment",
        transactions: [],
        user,
    });
    const category3 = new Category({
        name: "food",
        transactions: [],
        user,
    });
    const category4 = new Category({
        name: "health",
        transactions: [],
        user,
    });
    const category5 = new Category({
        name: "self",
        transactions: [],
        user,
    });
    const category6 = new Category({
        name: "groceries",
        transactions: [],
        user,
    });
    const category7 = new Category({
        name: "bills",
        transactions: [],
        user,
    });
    const category8 = new Category({
        name: "stationary",
        transactions: [],
        user,
    });
    const category9 = new Category({
        name: "shopping",
        transactions: [],
        user,
    });
    const category10 = new Category({
        name: "gift",
        transactions: [],
        user,
    });

    category1.save();
    category2.save();
    category3.save();
    category4.save();
    category5.save();
    category6.save();
    category7.save();
    category8.save();
    category9.save();
    category10.save();
};
