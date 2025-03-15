const expenseSchema = new mongoose.Schema({
    payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    owers: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: { type: Number, required: true }
    }],
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    date: { type: Date, default: Date.now }
  });
g  