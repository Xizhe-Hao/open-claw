#!/usr/bin/env python3
"""
芝加哥景点推荐算法 - 基于协同过滤
工部尚书 编写
纯Python实现，无需外部依赖
"""

from typing import List, Dict, Tuple, Any
import math
import random

class ChicagoAttraction:
    """芝加哥景点类"""
    def __init__(self, name: str, categories: List[str], description: str):
        self.name = name
        self.categories = categories  # 如: ['历史', '自然', '艺术', '美食']
        self.description = description
        self.feature_vector = None
        
    def __repr__(self):
        return f"{self.name} ({', '.join(self.categories)})"

class CollaborativeFilteringRecommender:
    """基于协同过滤的景点推荐系统"""
    
    def __init__(self):
        self.attractions = []
        self.user_ratings = {}  # 用户ID -> {景点索引: 评分}
        self.user_preferences = {}  # 用户ID -> 偏好向量
        self.similarity_matrix = None
        
    def add_attraction(self, attraction: ChicagoAttraction):
        """添加景点"""
        self.attractions.append(attraction)
        
    def initialize_attractions(self):
        """初始化芝加哥景点数据"""
        # 芝加哥著名景点
        attractions_data = [
            {"name": "芝加哥艺术博物馆", "categories": ["艺术", "历史"], 
             "description": "世界顶级艺术博物馆，收藏大量印象派作品"},
            {"name": "千禧公园", "categories": ["自然", "艺术"], 
             "description": "标志性的云门雕塑和露天音乐厅"},
            {"name": "菲尔德自然历史博物馆", "categories": ["历史", "自然"], 
             "description": "拥有世界上最大的霸王龙骨架"},
            {"name": "谢德水族馆", "categories": ["自然"], 
             "description": "美国最古老的水族馆之一"},
            {"name": "芝加哥建筑基金会河游", "categories": ["历史", "艺术"], 
             "description": "乘船游览芝加哥标志性建筑"},
            {"name": "深盘披萨店", "categories": ["美食"], 
             "description": "品尝芝加哥特色深盘披萨"},
            {"name": "芝加哥热狗摊", "categories": ["美食"], 
             "description": "正宗芝加哥风格热狗"},
            {"name": "科学工业博物馆", "categories": ["历史", "自然"], 
             "description": "互动式科学展览"},
            {"name": "林肯公园动物园", "categories": ["自然"], 
             "description": "免费入场的动物园"},
            {"name": "芝加哥剧院区", "categories": ["艺术"], 
             "description": "百老汇演出和现场表演"},
            {"name": "芝加哥历史博物馆", "categories": ["历史"], 
             "description": "了解芝加哥的城市发展史"},
            {"name": "格兰特公园", "categories": ["自然", "艺术"], 
             "description": "白金汉喷泉和户外活动场所"},
            {"name": "威利斯大厦观景台", "categories": ["历史"], 
             "description": "从103层俯瞰芝加哥全景"},
            {"name": "海军码头", "categories": ["自然", "美食", "艺术"], 
             "description": "游乐设施、餐厅和烟花表演"},
            {"name": "芝加哥美食之旅", "categories": ["美食", "历史"], 
             "description": "探索芝加哥多元美食文化"}
        ]
        
        for data in attractions_data:
            attraction = ChicagoAttraction(
                name=data["name"],
                categories=data["categories"],
                description=data["description"]
            )
            self.add_attraction(attraction)
            
        # 为每个景点生成特征向量
        self._generate_feature_vectors()
    
    def _generate_feature_vectors(self):
        """为景点生成特征向量"""
        all_categories = ["历史", "自然", "艺术", "美食"]
        
        for attraction in self.attractions:
            vector = np.zeros(len(all_categories))
            for i, category in enumerate(all_categories):
                if category in attraction.categories:
                    vector[i] = 1.0
            attraction.feature_vector = vector
    
    def add_user_rating(self, user_id: str, attraction_index: int, rating: float):
        """添加用户评分"""
        if user_id not in self.user_ratings:
            self.user_ratings[user_id] = {}
        self.user_ratings[user_id][attraction_index] = rating
        
        # 更新用户偏好向量
        self._update_user_preferences(user_id)
    
    def _update_user_preferences(self, user_id: str):
        """基于用户评分更新偏好向量"""
        if user_id not in self.user_ratings:
            return
            
        ratings = self.user_ratings[user_id]
        if not ratings:
            return
            
        # 计算加权平均的特征向量
        total_weight = 0
        preference_vector = np.zeros(4)  # 4个类别
        
        for idx, rating in ratings.items():
            if idx < len(self.attractions):
                weight = rating / 5.0  # 归一化到0-1
                preference_vector += weight * self.attractions[idx].feature_vector
                total_weight += weight
        
        if total_weight > 0:
            preference_vector /= total_weight
            
        self.user_preferences[user_id] = preference_vector
    
    def calculate_similarity_matrix(self):
        """计算景点相似度矩阵"""
        n = len(self.attractions)
        self.similarity_matrix = np.zeros((n, n))
        
        for i in range(n):
            for j in range(n):
                if i == j:
                    self.similarity_matrix[i][j] = 1.0
                else:
                    # 使用余弦相似度
                    vec_i = self.attractions[i].feature_vector
                    vec_j = self.attractions[j].feature_vector
                    similarity = np.dot(vec_i, vec_j) / (np.linalg.norm(vec_i) * np.linalg.norm(vec_j) + 1e-8)
                    self.similarity_matrix[i][j] = similarity
    
    def recommend_for_user(self, user_id: str, top_k: int = 5, 
                          preference_weights: Dict[str, float] = None) -> List[Tuple[int, float]]:
        """
        为用户推荐景点
        
        Args:
            user_id: 用户ID
            top_k: 推荐数量
            preference_weights: 手动指定的偏好权重，如 {'历史': 0.8, '自然': 0.2}
        
        Returns:
            推荐列表 [(景点索引, 预测评分), ...]
        """
        # 如果没有用户评分，使用偏好权重或随机推荐
        if user_id not in self.user_ratings or not self.user_ratings[user_id]:
            return self.recommend_by_preferences(preference_weights, top_k)
        
        # 协同过滤推荐
        rated_indices = list(self.user_ratings[user_id].keys())
        ratings = list(self.user_ratings[user_id].values())
        
        # 计算未评分景点的预测评分
        predictions = []
        for i in range(len(self.attractions)):
            if i in rated_indices:
                continue
                
            # 基于相似用户的评分预测（简化版）
            similarity_sum = 0
            weighted_sum = 0
            
            for j, rated_idx in enumerate(rated_indices):
                similarity = self.similarity_matrix[i][rated_idx]
                weighted_sum += similarity * ratings[j]
                similarity_sum += abs(similarity)
            
            if similarity_sum > 0:
                predicted_rating = weighted_sum / similarity_sum
            else:
                predicted_rating = 3.0  # 默认评分
                
            predictions.append((i, predicted_rating))
        
        # 按预测评分排序
        predictions.sort(key=lambda x: x[1], reverse=True)
        return predictions[:top_k]
    
    def recommend_by_preferences(self, preference_weights: Dict[str, float] = None, 
                                top_k: int = 5) -> List[Tuple[int, float]]:
        """
        基于偏好权重推荐
        
        Args:
            preference_weights: 偏好权重，如 {'历史': 0.8, '自然': 0.2}
            top_k: 推荐数量
        
        Returns:
            推荐列表 [(景点索引, 匹配度), ...]
        """
        if preference_weights is None:
            # 默认偏好：均衡分布
            preference_weights = {'历史': 0.25, '自然': 0.25, '艺术': 0.25, '美食': 0.25}
        
        # 创建偏好向量
        all_categories = ["历史", "自然", "艺术", "美食"]
        pref_vector = np.zeros(len(all_categories))
        
        for i, category in enumerate(all_categories):
            pref_vector[i] = preference_weights.get(category, 0.0)
        
        # 归一化
        if np.sum(pref_vector) > 0:
            pref_vector = pref_vector / np.sum(pref_vector)
        
        # 计算每个景点与偏好的匹配度
        scores = []
        for i, attraction in enumerate(self.attractions):
            similarity = np.dot(pref_vector, attraction.feature_vector)
            scores.append((i, similarity))
        
        # 按匹配度排序
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]
    
    def get_recommendation_details(self, recommendations: List[Tuple[int, float]]) -> str:
        """获取推荐详情"""
        result = "【芝加哥景点推荐】\n"
        
        for i, (idx, score) in enumerate(recommendations, 1):
            attraction = self.attractions[idx]
            result += f"\n{i}. {attraction.name}\n"
            result += f"   类别: {', '.join(attraction.categories)}\n"
            result += f"   描述: {attraction.description}\n"
            result += f"   推荐度: {score:.2f}/1.00\n"
        
        return result

def main():
    """主函数：演示推荐系统"""
    print("=" * 60)
    print("芝加哥景点推荐系统 - 基于协同过滤算法")
    print("=" * 60)
    
    # 初始化推荐系统
    recommender = CollaborativeFilteringRecommender()
    recommender.initialize_attractions()
    recommender.calculate_similarity_matrix()
    
    print(f"\n已加载 {len(recommender.attractions)} 个芝加哥景点")
    
    # 示例1：基于偏好权重的推荐
    print("\n" + "=" * 60)
    print("示例1：历史爱好者推荐")
    print("=" * 60)
    
    history_lover_prefs = {'历史': 0.7, '自然': 0.2, '艺术': 0.1, '美食': 0.0}
    recommendations = recommender.recommend_by_preferences(history_lover_prefs, top_k=5)
    print(recommender.get_recommendation_details(recommendations))
    
    # 示例2：美食爱好者推荐
    print("\n" + "=" * 60)
    print("示例2：美食爱好者推荐")
    print("=" * 60)
    
    food_lover_prefs = {'历史': 0.1, '自然': 0.1, '艺术': 0.1, '美食': 0.7}
    recommendations = recommender.recommend_by_preferences(food_lover_prefs, top_k=5)
    print(recommender.get_recommendation_details(recommendations))
    
    # 示例3：协同过滤推荐（模拟用户评分）
    print("\n" + "=" * 60)
    print("示例3：协同过滤推荐（模拟用户A的评分）")
    print("=" * 60)
    
    # 模拟用户A的评分
    user_a_ratings = {
        0: 5.0,  # 芝加哥艺术博物馆
        2: 4.5,  # 菲尔德自然历史博物馆
        5: 4.0,  # 深盘披萨店
    }
    
    for idx, rating in user_a_ratings.items():
        recommender.add_user_rating("user_a", idx, rating)
    
    recommendations = recommender.recommend_for_user("user_a", top_k=5)
    print(recommender.get_recommendation_details(recommendations))
    
    # 示例4：艺术与自然平衡推荐
    print("\n" + "=" * 60)
    print("示例4：艺术与自然平衡推荐")
    print("=" * 60)
    
    balanced_prefs = {'历史': 0.2, '自然': 0.4, '艺术': 0.4, '美食': 0.0}
    recommendations = recommender.recommend_by_preferences(balanced_prefs, top_k=5)
    print(recommender.get_recommendation_details(recommendations))
    
    print("\n" + "=" * 60)
    print("推荐系统演示完成")
    print("=" * 60)
    
    # 显示所有景点
    print("\n【所有可用景点】")
    for i, attraction in enumerate(recommender.attractions):
        print(f"{i:2d}. {attraction.name:25s} | 类别: {', '.join(attraction.categories):15s}")

if __name__ == "__main__":
    main()