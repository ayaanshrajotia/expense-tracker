import Category from "@/models/category";

export const createCustomCategories = async () => {
    const category1 = new Category({
        name: "transportation",
        transactions: [],
    });

    const category2 = new Category({
        name: "entertainment",
        transactions: [],
    });
    const category3 = new Category({
        name: "food",
        transactions: [],
    });
    const category4 = new Category({
        name: "health",
        transactions: [],
    });
    const category5 = new Category({
        name: "self",
        transactions: [],
    });
    const category6 = new Category({
        name: "groceries",
        transactions: [],
    });
    const category7 = new Category({
        name: "bills",
        transactions: [],
    });
    const category8 = new Category({
        name: "stationary",
        transactions: [],
    });
    const category9 = new Category({
        name: "shopping",
        transactions: [],
    });
    const category10 = new Category({
        name: "gift",
        transactions: [],
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
