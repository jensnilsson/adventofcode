use std::{
    fs::File,
    io::{BufReader, Lines},
};

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum MAS {
    M,
    A,
    S,
    BLANK,
}

const PATTERNS: [[(MAS, i64, i64); 4]; 4] = [
    [
        (MAS::M, -1, 1),
        (MAS::S, 1, -1),
        (MAS::M, -1, -1),
        (MAS::S, 1, 1),
    ],
    [
        (MAS::M, -1, 1),
        (MAS::S, 1, -1),
        (MAS::S, -1, -1),
        (MAS::M, 1, 1),
    ],
    [
        (MAS::S, -1, 1),
        (MAS::M, 1, -1),
        (MAS::S, -1, -1),
        (MAS::M, 1, 1),
    ],
    [
        (MAS::S, -1, 1),
        (MAS::M, 1, -1),
        (MAS::M, -1, -1),
        (MAS::S, 1, 1),
    ],
];

pub fn execute(lines: Lines<BufReader<File>>) {
    let matrix: Vec<Vec<MAS>> = lines
        .map(|line| {
            let line = line.unwrap();
            let vec_xmas = line
                .chars()
                .map(|char| match char {
                    'M' => MAS::M,
                    'A' => MAS::A,
                    'S' => MAS::S,
                    _ => MAS::BLANK,
                })
                .collect();
            vec_xmas
        })
        .collect();

    let mut sum: usize = 0;

    let mut row_index = 0;
    for line in &matrix {
        let mut column_index = 0;
        for char in line {
            if char == &MAS::A {
                let mas_count_for_a = PATTERNS
                    .iter()
                    .filter_map(|pattern| {
                        for part in pattern {
                            let row_part = (row_index + part.1) as usize;
                            let row_vec = matrix.get(row_part);

                            if let Some(row) = row_vec {
                                let column_part = (column_index + part.2) as usize;
                                let value = row.get(column_part);

                                match value {
                                    Some(value) => {
                                        if value != &part.0 {
                                            return None;
                                        }
                                    }
                                    _ => return None,
                                }
                            } else {
                                return None;
                            }
                        }
                        Some(())
                    })
                    .count();
                //println!("matches for x: {mas_count_for_a}, {row_index}, {column_index}");
                sum += mas_count_for_a;
            }
            column_index = column_index + 1;
        }
        row_index = row_index + 1;
    }

    println!("sum: {sum}");
}
