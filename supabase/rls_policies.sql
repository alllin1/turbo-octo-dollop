-- This SQL file contains Row Level Security (RLS) policies for the raffle platform
-- Execute this in the Supabase SQL Editor to implement proper data protection

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Competitions table policies
-- Anyone can view active competitions
CREATE POLICY "Anyone can view active competitions"
ON competitions FOR SELECT
USING (status = 'active');

-- Only admins can create competitions
CREATE POLICY "Only admins can create competitions"
ON competitions FOR INSERT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- Only admins can update competitions
CREATE POLICY "Only admins can update competitions"
ON competitions FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- Tickets table policies
-- Users can view their own tickets
CREATE POLICY "Users can view own tickets"
ON tickets FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own tickets
CREATE POLICY "Users can insert own tickets"
ON tickets FOR INSERT
TO authenticated
USING (auth.uid() = user_id);

-- Transactions table policies
-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
ON transactions FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own transactions
CREATE POLICY "Users can insert own transactions"
ON transactions FOR INSERT
TO authenticated
USING (auth.uid() = user_id);

-- Create a secure function for purchasing tickets with transaction integrity
CREATE OR REPLACE FUNCTION purchase_tickets(
  p_competition_id UUID,
  p_quantity INT,
  p_skill_answer TEXT,
  p_payment_method TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_ticket_price DECIMAL;
  v_transaction_id UUID;
  v_total_amount DECIMAL;
  v_result JSONB;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Authentication required'
    );
  END IF;
  
  -- Validate inputs
  IF p_competition_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Competition ID is required'
    );
  END IF;
  
  IF p_quantity IS NULL OR p_quantity < 1 OR p_quantity > 100 THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Quantity must be between 1 and 100'
    );
  END IF;
  
  IF p_skill_answer IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Skill answer is required'
    );
  END IF;
  
  -- Get ticket price from competition
  SELECT ticket_price INTO v_ticket_price
  FROM competitions
  WHERE id = p_competition_id AND status = 'active';
  
  IF v_ticket_price IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Competition not found or not active'
    );
  END IF;
  
  -- Calculate total amount
  v_total_amount := v_ticket_price * p_quantity;
  
  -- Start transaction
  BEGIN
    -- Insert transaction record
    INSERT INTO transactions (
      user_id,
      amount,
      status,
      payment_method,
      created_at
    )
    VALUES (
      v_user_id,
      v_total_amount,
      'completed',
      p_payment_method,
      NOW()
    )
    RETURNING id INTO v_transaction_id;
    
    -- Insert ticket records
    INSERT INTO tickets (
      competition_id,
      user_id,
      skill_answer,
      purchase_date,
      transaction_id
    )
    SELECT 
      p_competition_id,
      v_user_id,
      p_skill_answer,
      NOW(),
      v_transaction_id
    FROM generate_series(1, p_quantity);
    
    -- Update competition tickets sold count
    UPDATE competitions
    SET tickets_sold = tickets_sold + p_quantity
    WHERE id = p_competition_id;
    
    -- Return success
    v_result := jsonb_build_object(
      'success', true,
      'transaction_id', v_transaction_id,
      'tickets_purchased', p_quantity,
      'total_amount', v_total_amount
    );
    
    RETURN v_result;
  EXCEPTION WHEN OTHERS THEN
    -- Rollback happens automatically on exception
    v_result := jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
    RETURN v_result;
  END;
END;
$$;
