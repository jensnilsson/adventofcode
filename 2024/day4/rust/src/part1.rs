use std::{
    fs::File,
    io::{BufReader, Lines},
};

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum XMAS {
    X,
    M,
    A,
    S,
    BLANK,
}

const PATTERNS: [[(XMAS, i64, i64); 3]; 8] = [
    [(XMAS::M, 0, 1), (XMAS::A, 0, 2), (XMAS::S, 0, 3)], // right
    [(XMAS::M, 1, 1), (XMAS::A, 2, 2), (XMAS::S, 3, 3)], // right down
    [(XMAS::M, 1, 0), (XMAS::A, 2, 0), (XMAS::S, 3, 0)], // down
    [(XMAS::M, 1, -1), (XMAS::A, 2, -2), (XMAS::S, 3, -3)], // left down
    [(XMAS::M, 0, -1), (XMAS::A, 0, -2), (XMAS::S, 0, -3)], // left
    [(XMAS::M, -1, -1), (XMAS::A, -2, -2), (XMAS::S, -3, -3)], // left up
    [(XMAS::M, -1, 0), (XMAS::A, -2, 0), (XMAS::S, -3, 0)], // up
    [(XMAS::M, -1, 1), (XMAS::A, -2, 2), (XMAS::S, -3, 3)], // right up
];

pub fn execute(lines: Lines<BufReader<File>>) {
    let matrix: Vec<Vec<XMAS>> = lines
        .map(|line| {
            let line = line.unwrap();
            let vec_xmas = line
                .chars()
                .map(|char| match char {
                    'X' => XMAS::X,
                    'M' => XMAS::M,
                    'A' => XMAS::A,
                    'S' => XMAS::S,
                    _ => XMAS::BLANK,
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
            if char == &XMAS::X {
                let xmas_count_for_x = PATTERNS
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
                //println!("matches for x: {xmas_count_for_x}, {row_index}, {column_index}");
                sum += xmas_count_for_x;
            }
            column_index = column_index + 1;
        }
        row_index = row_index + 1;
    }

    println!("sum: {sum}");
}
