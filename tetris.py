#!/usr/bin/env python3
"""
俄罗斯方块 (Tetris) - Python实现
使用Pygame库
"""

import pygame
import random
import sys

# 初始化Pygame
pygame.init()

# 游戏常量
BLOCK_SIZE = 30
GRID_WIDTH = 10
GRID_HEIGHT = 20
SCREEN_WIDTH = BLOCK_SIZE * GRID_WIDTH + 200
SCREEN_HEIGHT = BLOCK_SIZE * GRID_HEIGHT

# 颜色定义
COLORS = {
    'black': (0, 0, 0),
    'white': (255, 255, 255),
    'gray': (128, 128, 128),
    'cyan': (0, 255, 255),     # I型
    'yellow': (255, 255, 0),    # O型
    'purple': (128, 0, 128),    # T型
    'green': (0, 255, 0),       # S型
    'red': (255, 0, 0),         # Z型
    'blue': (0, 0, 255),        # J型
    'orange': (255, 165, 0),    # L型
}

# 俄罗斯方块形状定义 (每个形状有多个旋转状态)
SHAPES = {
    'I': {
        'color': COLORS['cyan'],
        'rotations': [
            [(0, 1), (1, 1), (2, 1), (3, 1)],
            [(2, 0), (2, 1), (2, 2), (2, 3)],
            [(0, 2), (1, 2), (2, 2), (3, 2)],
            [(1, 0), (1, 1), (1, 2), (1, 3)],
        ]
    },
    'O': {
        'color': COLORS['yellow'],
        'rotations': [
            [(1, 0), (2, 0), (1, 1), (2, 1)],
            [(1, 0), (2, 0), (1, 1), (2, 1)],
            [(1, 0), (2, 0), (1, 1), (2, 1)],
            [(1, 0), (2, 0), (1, 1), (2, 1)],
        ]
    },
    'T': {
        'color': COLORS['purple'],
        'rotations': [
            [(1, 0), (0, 1), (1, 1), (2, 1)],
            [(1, 0), (1, 1), (2, 1), (1, 2)],
            [(0, 1), (1, 1), (2, 1), (1, 2)],
            [(1, 0), (0, 1), (1, 1), (1, 2)],
        ]
    },
    'S': {
        'color': COLORS['green'],
        'rotations': [
            [(1, 0), (2, 0), (0, 1), (1, 1)],
            [(1, 0), (1, 1), (2, 1), (2, 2)],
            [(1, 1), (2, 1), (0, 2), (1, 2)],
            [(0, 0), (0, 1), (1, 1), (1, 2)],
        ]
    },
    'Z': {
        'color': COLORS['red'],
        'rotations': [
            [(0, 0), (1, 0), (1, 1), (2, 1)],
            [(2, 0), (1, 1), (2, 1), (1, 2)],
            [(0, 1), (1, 1), (1, 2), (2, 2)],
            [(1, 0), (0, 1), (1, 1), (0, 2)],
        ]
    },
    'J': {
        'color': COLORS['blue'],
        'rotations': [
            [(0, 0), (0, 1), (1, 1), (2, 1)],
            [(1, 0), (2, 0), (1, 1), (1, 2)],
            [(0, 1), (1, 1), (2, 1), (2, 2)],
            [(1, 0), (1, 1), (0, 2), (1, 2)],
        ]
    },
    'L': {
        'color': COLORS['orange'],
        'rotations': [
            [(2, 0), (0, 1), (1, 1), (2, 1)],
            [(1, 0), (1, 1), (1, 2), (2, 2)],
            [(0, 1), (1, 1), (2, 1), (0, 2)],
            [(0, 0), (1, 0), (1, 1), (1, 2)],
        ]
    },
}


class Tetromino:
    """俄罗斯方块类"""
    def __init__(self):
        self.shape_types = list(SHAPES.keys())
        self.shape = random.choice(self.shape_types)
        self.color = SHAPES[self.shape]['color']
        self.rotation = 0
        self.x = GRID_WIDTH // 2 - 2
        self.y = 0

    def get_blocks(self):
        """获取方块当前状态的方块位置"""
        return SHAPES[self.shape]['rotations'][self.rotation]

    def rotate(self):
        """旋转方块"""
        self.rotation = (self.rotation + 1) % 4

    def unrotate(self):
        """反向旋转（用于碰撞检测）"""
        self.rotation = (self.rotation - 1) % 4


class Game:
    """游戏主类"""
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption('俄罗斯方块')
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.big_font = pygame.font.Font(None, 72)
        
        self.reset_game()

    def reset_game(self):
        """重置游戏"""
        self.grid = [[None for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
        self.current_piece = Tetromino()
        self.next_piece = Tetromino()
        self.score = 0
        self.lines = 0
        self.level = 1
        self.game_over = False
        self.fall_time = 0
        self.fall_speed = 500  # 毫秒
        self.last_fall = pygame.time.get_ticks()

    def valid_move(self, piece, x_offset=0, y_offset=0, rotation=None):
        """检查移动是否有效"""
        if rotation is None:
            rotation = piece.rotation
        
        blocks = SHAPES[piece.shape]['rotations'][rotation]
        
        for bx, by in blocks:
            new_x = piece.x + bx + x_offset
            new_y = piece.y + by + y_offset
            
            if new_x < 0 or new_x >= GRID_WIDTH:
                return False
            if new_y >= GRID_HEIGHT:
                return False
            if new_y >= 0 and self.grid[new_y][new_x] is not None:
                return False
        
        return True

    def lock_piece(self):
        """锁定当前方块到网格"""
        blocks = self.current_piece.get_blocks()
        
        for bx, by in blocks:
            x = self.current_piece.x + bx
            y = self.current_piece.y + by
            if y >= 0:
                self.grid[y][x] = self.current_piece.color
        
        self.clear_lines()
        self.current_piece = self.next_piece
        self.next_piece = Tetromino()
        
        if not self.valid_move(self.current_piece):
            self.game_over = True

    def clear_lines(self):
        """消除满行"""
        lines_cleared = 0
        y = GRID_HEIGHT - 1
        
        while y >= 0:
            if all(self.grid[y][x] is not None for x in range(GRID_WIDTH)):
                del self.grid[y]
                self.grid.insert(0, [None for _ in range(GRID_WIDTH)])
                lines_cleared += 1
            else:
                y -= 1
        
        # 计分系统
        if lines_cleared > 0:
            points = {1: 100, 2: 300, 3: 500, 4: 800}
            self.score += points.get(lines_cleared, 0) * self.level
            self.lines += lines_cleared
            self.level = self.lines // 10 + 1
            self.fall_speed = max(100, 500 - (self.level - 1) * 50)

    def move_piece(self, dx, dy):
        """移动方块"""
        if self.valid_move(self.current_piece, x_offset=dx, y_offset=dy):
            self.current_piece.x += dx
            self.current_piece.y += dy
            return True
        return False

    def rotate_piece(self):
        """旋转方块"""
        if self.valid_move(self.current_piece, rotation=(self.current_piece.rotation + 1) % 4):
            self.current_piece.rotate()
        else:
            # 尝试墙踢 (Wall Kick)
            for offset in [-1, 1, -2, 2]:
                if self.valid_move(self.current_piece, x_offset=offset, 
                                   rotation=(self.current_piece.rotation + 1) % 4):
                    self.current_piece.x += offset
                    self.current_piece.rotate()
                    break

    def drop_piece(self):
        """直接落到底部"""
        while self.move_piece(0, 1):
            pass
        self.lock_piece()

    def draw_block(self, x, y, color, surface=None):
        """绘制单个方块"""
        if surface is None:
            surface = self.screen
        
        rect = pygame.Rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        pygame.draw.rect(surface, color, rect)
        pygame.draw.rect(surface, COLORS['white'], rect, 2)
        
        # 添加内阴影效果
        inner_rect = pygame.Rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 4, 
                                  BLOCK_SIZE - 8, BLOCK_SIZE - 8)
        pygame.draw.rect(surface, tuple(max(0, c - 40) for c in color), inner_rect, 2)

    def draw_grid(self):
        """绘制游戏区域"""
        # 绘制背景网格
        for y in range(GRID_HEIGHT):
            for x in range(GRID_WIDTH):
                rect = pygame.Rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 
                                   BLOCK_SIZE, BLOCK_SIZE)
                pygame.draw.rect(self.screen, COLORS['gray'], rect, 1)
        
        # 绘制已固定的方块
        for y in range(GRID_HEIGHT):
            for x in range(GRID_WIDTH):
                if self.grid[y][x] is not None:
                    self.draw_block(x, y, self.grid[y][x])
        
        # 绘制当前方块
        if not self.game_over:
            blocks = self.current_piece.get_blocks()
            for bx, by in blocks:
                self.draw_block(self.current_piece.x + bx, 
                               self.current_piece.y + by, 
                               self.current_piece.color)

    def draw_sidebar(self):
        """绘制侧边栏"""
        sidebar_x = GRID_WIDTH * BLOCK_SIZE + 10
        
        # 下一个方块预览
        next_text = self.font.render('NEXT', True, COLORS['white'])
        self.screen.blit(next_text, (sidebar_x, 20))
        
        # 绘制下一个方块预览
        preview_x = sidebar_x + 20
        preview_y = 60
        blocks = SHAPES[self.next_piece.shape]['rotations'][0]
        for bx, by in blocks:
            rect = pygame.Rect(preview_x + bx * 20, preview_y + by * 20, 20, 20)
            pygame.draw.rect(self.screen, self.next_piece.color, rect)
            pygame.draw.rect(self.screen, COLORS['white'], rect, 1)
        
        # 分数
        score_text = self.font.render(f'SCORE: {self.score}', True, COLORS['white'])
        self.screen.blit(score_text, (sidebar_x, 180))
        
        # 行数
        lines_text = self.font.render(f'LINES: {self.lines}', True, COLORS['white'])
        self.screen.blit(lines_text, (sidebar_x, 220))
        
        # 等级
        level_text = self.font.render(f'LEVEL: {self.level}', True, COLORS['white'])
        self.screen.blit(level_text, (sidebar_x, 260))
        
        # 控制说明
        controls = [
            'CONTROLS:',
            'LEFT/RIGHT - Move',
            'UP - Rotate',
            'DOWN - Soft Drop',
            'SPACE - Hard Drop',
            'P - Pause',
            'R - Restart',
        ]
        y = 320
        for line in controls:
            text = self.font.render(line, True, COLORS['gray'])
            self.screen.blit(text, (sidebar_x, y))
            y += 25

    def draw_pause(self):
        """绘制暂停画面"""
        overlay = pygame.Surface((GRID_WIDTH * BLOCK_SIZE, SCREEN_HEIGHT))
        overlay.set_alpha(150)
        overlay.fill(COLORS['black'])
        self.screen.blit(overlay, (0, 0))
        
        pause_text = self.big_font.render('PAUSED', True, COLORS['white'])
        text_rect = pause_text.get_rect(center=(GRID_WIDTH * BLOCK_SIZE // 2, 
                                                SCREEN_HEIGHT // 2 - 30))
        self.screen.blit(pause_text, text_rect)
        
        resume_text = self.font.render('Press P to Resume', True, COLORS['gray'])
        resume_rect = resume_text.get_rect(center=(GRID_WIDTH * BLOCK_SIZE // 2, 
                                                    SCREEN_HEIGHT // 2 + 30))
        self.screen.blit(resume_text, resume_rect)

    def draw_game_over(self):
        """绘制游戏结束画面"""
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
        overlay.set_alpha(180)
        overlay.fill(COLORS['black'])
        self.screen.blit(overlay, (0, 0))
        
        game_over_text = self.big_font.render('GAME OVER', True, COLORS['red'])
        text_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2 - 100, 
                                                     SCREEN_HEIGHT // 2 - 50))
        self.screen.blit(game_over_text, text_rect)
        
        score_text = self.font.render(f'Final Score: {self.score}', True, COLORS['white'])
        score_rect = score_text.get_rect(center=(SCREEN_WIDTH // 2 - 100, 
                                                 SCREEN_HEIGHT // 2 + 20))
        self.screen.blit(score_text, score_rect)
        
        restart_text = self.font.render('Press R to Restart', True, COLORS['gray'])
        restart_rect = restart_text.get_rect(center=(SCREEN_WIDTH // 2 - 100, 
                                                     SCREEN_HEIGHT // 2 + 60))
        self.screen.blit(restart_text, restart_rect)

    def run(self):
        """游戏主循环"""
        running = True
        paused = False
        
        while running:
            current_time = pygame.time.get_ticks()
            
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_r:
                        self.reset_game()
                    elif event.key == pygame.K_p:
                        paused = not paused
                    elif not self.game_over and not paused:
                        if event.key == pygame.K_LEFT:
                            self.move_piece(-1, 0)
                        elif event.key == pygame.K_RIGHT:
                            self.move_piece(1, 0)
                        elif event.key == pygame.K_UP:
                            self.rotate_piece()
                        elif event.key == pygame.K_DOWN:
                            if self.move_piece(0, 1):
                                self.score += 1
                        elif event.key == pygame.K_SPACE:
                            self.drop_piece()
            
            if not self.game_over and not paused:
                # 自动下落
                if current_time - self.last_fall > self.fall_speed:
                    if not self.move_piece(0, 1):
                        self.lock_piece()
                    self.last_fall = current_time
            
            # 绘制
            self.screen.fill(COLORS['black'])
            self.draw_grid()
            self.draw_sidebar()
            
            if paused:
                self.draw_pause()
            elif self.game_over:
                self.draw_game_over()
            
            pygame.display.flip()
            self.clock.tick(60)
        
        pygame.quit()
        sys.exit()


if __name__ == '__main__':
    game = Game()
    game.run()
